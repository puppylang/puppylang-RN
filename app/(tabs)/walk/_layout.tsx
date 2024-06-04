import { Stack, Tabs, useSegments } from "expo-router";

export default () => {
  const segments = useSegments();
  const hidesTab = segments.includes("detail");

  return (
    <>
      <Tabs.Screen
        options={{ tabBarStyle: { display: hidesTab ? "none" : "flex" } }}
      />
      <Stack initialRouteName="home">
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="detail" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};
