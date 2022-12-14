import React, { useEffect } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import AppProvider from "./context/AppContext";
 
const App = () => {

    return (
        <div>
            <AppProvider>
                <h1>sup</h1>
            </AppProvider>
           
        </div>
    );
}

export default App