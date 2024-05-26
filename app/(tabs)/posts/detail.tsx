import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Stack, Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import {
  StackActions,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import { Route, RouterMethod, WebviewRouter } from "../../../types/route";
import { useEffect, useRef, useState } from "react";

interface WebviewStackDetailProps {
  headerTitle: string;
  headerShown?: boolean;
}

export default function PostsDetail({
  headerTitle,
  headerShown = true,
}: WebviewStackDetailProps) {
  const [isClickedTabBtn, setIsClickedTabButton] = useState(false);

  const webViewRef = useRef<WebView>(null);

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
    if (pushPage === "good") {
      const pushAction = StackActions[type](pushPage || "detail", {
        url,
        isStack: isStack === undefined || isStack,
      });
      navigation.dispatch(pushAction);

      return;
    }
    const pushAction = StackActions[type](pushPage || "detail", {
      url,
      isStack: isStack === undefined || isStack,
    });
    navigation.dispatch(pushAction);
  };

  useEffect(() => {
    if (!webViewRef || !webViewRef.current) return;
    if (!isClickedTabBtn) return;

    webViewRef.current.postMessage("isClickedTabBtn");
  }, [isClickedTabBtn]);

  return (
    <>
      <Tabs.Screen options={{ tabBarStyle: { display: "none" } }} />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitle: undefined,
          headerTitle,
          headerShadowVisible: false,
        }}
      />
      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          onMessage={requestOnMessage}
          source={{ uri: Route.url + params.url }}
          sharedCookiesEnabled
        />
      </View>
    </>
  );
}
