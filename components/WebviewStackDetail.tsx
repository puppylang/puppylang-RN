import { TouchableOpacity, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Stack, Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import {
  StackActions,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Route, RouterMethod, WebviewRouter } from "../types/route";

interface WebviewStackDetailProps {
  headerTitle: string;
  headerShown?: boolean;
}

export default function WebviewStackDetail({
  headerTitle,
  headerShown = true,
}: WebviewStackDetailProps) {
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

  return (
    <>
      <Tabs.Screen options={{ tabBarStyle: { display: "none" } }} />
      <Stack.Screen
        options={{
          headerShown,
          headerBackTitle: undefined,
          headerTitle,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={16}
                color="#666666"
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
          ),
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
