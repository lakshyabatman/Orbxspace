import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AppState } from "../models";
import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import PostPage from "../pages/PostPage/PostPage";
import LayoutPage from "./Layout/Layout";

const Application = () => {
  const context = useContext(AppContext);

  if (context == null) return <h1>ERROR</h1>;

  const getAppState = () => {
    switch (context.appState) {
      case AppState.NO_GROUP_FOUND:
        return <h1>No group found</h1>;
      case AppState.HOME_PAGE:
        return <HomePage />;
      case AppState.POST_PAGE:
        return <PostPage />;
      default:
        return <h1>Unexpected state</h1>;
    }
  };
  return <LayoutPage>{getAppState()}</LayoutPage>;
};

export default Application;
