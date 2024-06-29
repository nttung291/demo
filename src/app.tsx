import React from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { AppContextContainer } from "./context";
import { CombinedDefaultTheme } from "./theme";
import { AppNavigator } from "../src/navigators";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { store } from "./state/store";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppContextContainer>
          <PaperProvider theme={CombinedDefaultTheme}>
            <AppNavigator theme={CombinedDefaultTheme} />
          </PaperProvider>
        </AppContextContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
