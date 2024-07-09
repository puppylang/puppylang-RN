import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Stack, Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import {
  StackActions,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import { Route, WebviewType, WebviewRequestType } from "../types/route";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WebviewStackDetail() {
  const params = useLocalSearchParams<{ url?: string }>();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const requestOnMessage = async (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data) as WebviewRequestType;
    const { url, type, pushPage, isStack, token } = nativeEvent;

    if (type === WebviewType.UpdateToken) {
      await AsyncStorage.setItem("token", token || "");

      return;
    }

    if (type === WebviewType.Back) {
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
