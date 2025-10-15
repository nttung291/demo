import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import {
  PartialState,
  NavigationState,
  NavigationAction,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { RootStackParamList } from "@types";

export const RootNavigation = {
  navigate(_name: string, _params?: any) {},
  goBack() {},
  resetRoot(_state?: PartialState<NavigationState> | NavigationState) {},
  getRootState(): NavigationState {
    return {} as any;
  },
  dispatch(_action: NavigationAction) {},
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
): string {
  const { index } = state;
  const route = state.routes[index || 0];

  if (!route.state) {
    return route.name;
  }

  return getActiveRouteName(route.state);
}

export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }
      const routeName = getActiveRouteName(navigationRef.getRootState());
      if (canExitRef.current(routeName)) {
        BackHandler.exitApp();
        return true;
      }
      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove();
  }, []);
}

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = { index: 0, routes: [] }) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}
