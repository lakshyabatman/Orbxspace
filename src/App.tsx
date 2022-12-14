import React from "react";
import AppProvider from "./context/AppContext";
import { Button } from "antd";

const App = () => {
  return (
    <div>
      <AppProvider>
        <Button type="primary">Hello World</Button>
      </AppProvider>
    </div>
  );
};

export default App;
