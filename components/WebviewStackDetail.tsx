import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Stack, Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import {
  StackActions,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import { Route, RouterMethod, WebviewRouter } from "../types/route";

export default function WebviewStackDetail() {
  const params = useLocalSearchParams<{ url?: string }>();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data) as WebviewRouter;
    const { url, type, pushPage, isStack } = nativeEvent;

    if (type === RouterMethod.Back) {
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
      return;
    }

    const pushAction = StackActions[type](pushPage || "detail", {
      url,
      isStack: isStack === undefined || isStack,
    });
    navigation.dispatch(pushAction);
  };

  return (
    <>
      <Tabs.Screen options={{ tabBarStyle: { display: "none" } }} />
      <Stack.Screen
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <View style={{ flex: 1 }}>
        <WebView
          onMessage={requestOnMessage}
          source={{ uri: Route.url + params.url }}
          sharedCookiesEnabled
        />
      </View>
    </>
  );
}
