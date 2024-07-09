import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Route, WebviewRequestType } from "../types/route";

export default function index() {
  const [accessToken, setAccessToken] = useState("");

  const webviewRef = useRef<WebView>(null);

  const navigation = useNavigation();

  const requestOnMessage = async (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data) as WebviewRequestType;
    const { url, token } = nativeEvent;

    const pushAction = StackActions.replace(
      url === "/posts" ? "(tabs)" : "detail",
      {
        url,
        isStack: true,
      }
    );

    if (token) {
      await AsyncStorage.setItem("token", token || "");
    }
    navigation.dispatch(pushAction);
  };

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      setAccessToken(token || "");
      const pushAction = StackActions.replace("(tabs)");
      navigation.dispatch(pushAction);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{
          headers: {
            cookie: `token=${accessToken};path=/; Secure; SameSite=None`,
          },
          uri: Route.url,
        }}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        onMessage={(event) => requestOnMessage(event)}
        sharedCookiesEnabled
      />
    </View>
  );
}
