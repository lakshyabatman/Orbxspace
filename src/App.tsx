import React from "react";
import AppProvider from "./context/AppContext";
import Application from "./components/Application";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <div>
      <AppProvider>
        <ChakraProvider>
          <Application />
        </ChakraProvider>
      </AppProvider>
    </div>
  );
};

export default App;
