import { Stack } from "expo-router";

export default () => {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="detail" options={{ headerShown: false }} />
      <Stack.Screen name="stack" options={{ headerShown: false }} />
    </Stack>
  );
};
