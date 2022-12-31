import React from "react";
import AppProvider from "./context/AppContext";
import Application from "./components/Application";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <div>
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
    </div>
  );
};

export default App;
