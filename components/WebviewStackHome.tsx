import { useNavigation } from "expo-router";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, CommonActions } from "@react-navigation/native";

import { Route, WebviewRouter } from "../types/route";
import { View } from "react-native";

export default function StackHome({ url }: { url: string }) {
  const navigation = useNavigation();

  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data) as WebviewRouter;
    const { url, pushPage } = nativeEvent;
    const isLogout = pushPage === "index";

    if (isLogout) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "index" }],
      });
      navigation.dispatch(resetAction);
      await AsyncStorage.removeItem("token");

      return;
    }

    const pushAction = StackActions.push(pushPage || "detail", {
      url,
      isStack: true,
    });
    navigation.dispatch(pushAction);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        onMessage={requestOnMessage}
        source={{
          uri: Route.url + url,
        }}
      />
    </View>
  );
}
