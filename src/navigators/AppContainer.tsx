import { RootState } from "@app/app-reduxs/store";
import { LoadingAbsolute, ModalNetworkFailed } from "@app/components";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { useSelector } from "react-redux";
import MainNavigator from "./MainNavigator";
import Routes from "./Routes";
import rootNavigation from "./rootNavigation";

const LoadingView = () => {
  const isVisible = useSelector((state: RootState) => state.appReducer.is_loading);
  return (
    isVisible ?
      <LoadingAbsolute />
      :
      null
  )
}

const AppContainer = () => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hide();
      clearTimeout(timeout)
    }, 1000);
  }, []);

  const linking = {
    prefixes: ["app://"],
    config: {
      initialRouteName: Routes.HOME_SCREEN,
      screens: {
        [Routes.URL_NOT_FOUND]: '*'
      }
    }
  };

  return (
    <NavigationContainer ref={rootNavigation.navigationRef} linking={linking} >
      <MainNavigator />
      <LoadingView />
      <ModalNetworkFailed />
    </NavigationContainer>
  );
};

export default AppContainer;
