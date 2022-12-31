import React from "react";
import AppProvider from "./context/AppContext";
import Application from "./components/Application";
import { ChakraProvider } from "@chakra-ui/react";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <div>
      <ChakraProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#69248A",
              colorBgTextHover: "#F3E7F9",
              colorBgTextActive: "#eac5fc",
              controlItemBgHover: "#F3E7F9",
              controlItemBgActive: "#eac5fc",
            },
          }}
        >
          <AppProvider>
            <Application />
          </AppProvider>
        </ConfigProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
