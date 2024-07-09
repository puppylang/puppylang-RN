import { useNavigation } from "expo-router";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, CommonActions } from "@react-navigation/native";

import { Route, WebviewRequestType, WebviewType } from "../types/route";

export default function StackHome({ url }: { url: string }) {
  const navigation = useNavigation();

  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data) as WebviewRequestType;
    const { url, pushPage, token, type } = nativeEvent;
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

    if (type === WebviewType.UpdateToken) {
      console.log(token);
      await AsyncStorage.setItem("token", token || "");
      const good = await AsyncStorage.getItem("token");
      console.log("good=", good);
      return;
    }

    if (type === WebviewType.Back) {
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
      return;
    }

    const pushAction = StackActions[type](pushPage || "detail", {
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
