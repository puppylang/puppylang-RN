import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Animated, Text } from "react-native";
import { ReactNode } from "react";

export default () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="posts"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home-sharp" size={18} color="#383838" />
            ) : (
              <Ionicons name="home-outline" size={18} color="#c7c7c7" />
            ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#383838" : "#c7c7c7" }}>홈</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="stroll"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="paw" size={18} color="#383838" />
            ) : (
              <Ionicons name="paw-outline" size={18} color="#c7c7c7" />
            ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#383838" : "#c7c7c7" }}>산책</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbubble-sharp" size={18} color="#383838" />
            ) : (
              <Ionicons name="chatbubble-outline" size={18} color="#c7c7c7" />
            ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#383838" : "#c7c7c7" }}>채팅</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          tabBarStyle: {},
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={20} color="#383838" />
            ) : (
              <Ionicons name="person-outline" size={18} color="#c7c7c7" />
            ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#383838" : "#c7c7c7" }}>
              프로필
            </Text>
          ),
        }}
      />
    </Tabs>
  );
};

interface BounceAnimationProps {
  children: ReactNode;
}

export function BounceAnimation({ children }: BounceAnimationProps) {
  return <Animated.View>{children}</Animated.View>;
}
