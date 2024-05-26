import { WebViewMessageEvent } from "react-native-webview";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export const requestOnMessage = async (
  e: WebViewMessageEvent
): Promise<void> => {
  const navigation = useNavigation();

  const nativeEvent = JSON.parse(e.nativeEvent.data);
  if (nativeEvent?.type === "ROUTER_EVENT") {
    const path: string = nativeEvent.data;
    if (path === "back") {
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
    } else {
      const pushAction = StackActions.push("man", {
        url: nativeEvent.data,
        isStack: true,
      });
      navigation.dispatch(pushAction);
    }
  }
};
