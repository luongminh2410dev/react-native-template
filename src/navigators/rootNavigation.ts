import * as React from "react";
import {
  StackActions,
  CommonActions,
  NavigationContainerRef,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

const navigationRef =
  React.createRef<NavigationContainerRef<ReactNavigation.RootParamList>>();

export function navigate(routeName: string, params?: {[key: string]: any}) {
  navigationRef?.current?.navigate(routeName as never, params);
}

export function reset(params: {
  routeName: string;
  params?: any;
  index?: number;
}) {
  navigationRef?.current?.dispatch(
    CommonActions.reset({
      index: params?.index!,
      routes: [{name: params?.routeName!, params: params?.params!}],
    }),
  );
}

export function pop() {
  navigationRef?.current?.dispatch(CommonActions.goBack());
}
export function goBack() {
  navigationRef?.current?.goBack();
}
export function replace(routeName: string, params = {}) {
  navigationRef?.current?.dispatch(StackActions.replace(routeName, params));
}

export function push(routeName: string, params = {}) {
  navigationRef?.current?.dispatch(StackActions.push(routeName, params));
}

export function getCurrentRoute() {
  const rootState = navigationRef?.current?.getRootState();
  const currentRoute = navigationRef?.current?.getCurrentRoute();

  return {...currentRoute, index: rootState?.index!};
}

export function setParams(argument: {params: any; source: string}) {
  navigationRef?.current?.dispatch({
    ...CommonActions.setParams(argument?.params!),
    source: argument?.source!,
  });
}

export default {
  navigationRef,
};
