import React from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";
import { AppContextContainer } from "./context";
import { CombinedDefaultTheme } from "./theme";
import { AppNavigator } from "../src/navigators";
import { Provider } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { store, persistor } from "./state/store";
import "react-native-gesture-handler";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AppContextContainer>
            <PaperProvider theme={CombinedDefaultTheme}>
              <BottomSheetModalProvider>
                <AppNavigator theme={CombinedDefaultTheme} />
              </BottomSheetModalProvider>
            </PaperProvider>
          </AppContextContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
