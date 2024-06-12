import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { StackActions } from "@react-navigation/native";
import { Tabs, useNavigation } from "expo-router";
import { Route, WebviewRouter } from "../../../types/route";

export default function Post() {
  const navigation = useNavigation();

  const requestOnMessage = async (e: WebViewMessageEvent): Promise<void> => {
    const nativeEvent = JSON.parse(e.nativeEvent.data) as WebviewRouter;
    const { url } = nativeEvent;
    const pushAction = StackActions.push("detail", {
      url,
      isStack: true,
    });
    navigation.dispatch(pushAction);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs.Screen options={{ tabBarStyle: { display: "none" } }} />
      <WebView
        onMessage={requestOnMessage}
        source={{
          uri: Route.url + Route.posts,
        }}
      />
    </View>
  );
}
