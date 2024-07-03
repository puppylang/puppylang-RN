import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Animated, Text } from "react-native";
import { ReactNode, useEffect, useState } from "react";
import EventSource from "react-native-sse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
  const [hasNotReadedMessage, setHasNotReadedMessage] = useState(false);
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const SSE_URL = __DEV__
        ? "http://localhost:8000/chat/sse"
        : "https://mass-bonnie-puppylang-server-accb847f.koyeb.app/chat/sse";
      const serverSentEvents = new EventSource(`${SSE_URL}?token=${token}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      serverSentEvents.addEventListener("message", (event) => {
        const { data } = event;
        if (!data) return;
        const { hasNotReadedMessage } = JSON.parse(data);
        setHasNotReadedMessage(hasNotReadedMessage);
      });
    })();
  }, []);

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
        name="walk"
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
          tabBarBadge: "",
          tabBarBadgeStyle: {
            backgroundColor: "#6AC9E5",
            display: hasNotReadedMessage ? "flex" : "none",
            opacity: 0.8,
            minWidth: 13,
            height: 13,
            left: 1,
            top: 5,
          },
        }}
      />
      <Tabs.Screen
        name="user"
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
