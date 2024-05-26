import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";

import { Route, WebviewRouter } from "../types/route";

export default function StartPage() {
  const navigation = useNavigation();

  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data) as WebviewRouter;
    const { url } = nativeEvent;
    const pushAction = StackActions.push(
      url === "/posts" ? "(tabs)" : "detail",
      {
        url,
        isStack: true,
      }
    );
    navigation.dispatch(pushAction);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: Route.url }}
        onMessage={requestOnMessage}
        sharedCookiesEnabled
      />
    </View>
  );
}
