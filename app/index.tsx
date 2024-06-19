import { useEffect, useRef } from "react";
import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Route, WebviewRouter } from "../types/route";

export default function StartPage() {
  const webviewRef = useRef<WebView>(null);

  const navigation = useNavigation();

  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data) as WebviewRouter;
    const { url, token } = nativeEvent;

    const pushAction = StackActions.replace(
      url === "/posts" ? "(tabs)" : "detail",
      {
        url,
        isStack: true,
      }
    );

    await AsyncStorage.setItem("token", token || "");
    navigation.dispatch(pushAction);
  };

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem("token");
      if (!accessToken) return;
      webviewRef.current?.injectJavaScript(
        `document.cookie = 'token=${accessToken};path=/; SameSite=None; Secure'`
      );
      const pushAction = StackActions.replace("(tabs)");
      navigation.dispatch(pushAction);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: Route.url }}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        onMessage={(event) => requestOnMessage(event)}
      />
    </View>
  );
}
