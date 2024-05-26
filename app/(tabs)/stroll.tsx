import { View } from "react-native";
import WebView from "react-native-webview";
import { Route } from "../../types/route";

export default function Stroll() {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: Route.url + Route.stroll }} />
    </View>
  );
}
