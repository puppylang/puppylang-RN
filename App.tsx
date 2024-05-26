import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function App() {
  return <WebView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
