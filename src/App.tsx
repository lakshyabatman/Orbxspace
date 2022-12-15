import React from "react";
import AppProvider from "./context/AppContext";
import { Button } from "antd";
import Application from "./components/Application";

const App = () => {
  return (
    <div>
      <AppProvider>
        <Application/>
      </AppProvider>
    </div>
  );
};

export default App;
