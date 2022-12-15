import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AppState } from "../models";
import React from "react";
import Navbar from "./Navbar/Navbar";

const Application = () => {




    const context = useContext(AppContext);

    if(context == null) return (<h1>ERROR</h1>)


    const getAppState = () => {
        switch(context.appState) {
            case AppState.NO_GROUP_FOUND:
                return <h1>No group found</h1>
            case AppState.HOME_PAGE:
                return <h1>Home page</h1>
            case AppState.POST_PAGE:
                return <h1>Post Page</h1>
            default:
                return <h1>Unexpected state</h1>
        }
    }
    return (
        <>
            <Navbar/>
            {getAppState()}
        </>
    )
}



export default Application;