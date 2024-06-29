import React from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { AppContextContainer, OrderContextContainer } from "./context";
import { CombinedDefaultTheme } from "./theme";
import { AppNavigator } from "../src/navigators";
import "react-native-gesture-handler";

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppContextContainer>
        <OrderContextContainer>
          <PaperProvider theme={CombinedDefaultTheme}>
            <AppNavigator theme={CombinedDefaultTheme} />
          </PaperProvider>
        </OrderContextContainer>
      </AppContextContainer>
    </SafeAreaProvider>
  );
};

export default App;
