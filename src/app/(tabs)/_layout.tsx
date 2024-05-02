import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "@/tw";

const RouterTabs = () => {
  return (
    <Tabs key={tw.memoBuster}
      initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons color="black" name="face-man-profile" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => <MaterialCommunityIcons color="black" name="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          href: { pathname: "/details", params: { user: "evanbacon" } },
          tabBarIcon: () => (
            <MaterialCommunityIcons color="black" name="card-account-details" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          tabBarIcon: () => <MaterialCommunityIcons color="black" name="counter" size={24} />,
        }}
      />
    </Tabs>
  );
};

export default RouterTabs;
