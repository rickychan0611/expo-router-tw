import { Tabs, useRouter } from "expo-router";
import tw from "@/tw";
import TabBar from "@/components/TabBar";
import { useAppStore } from "@/stores";
import { View } from "react-native";

const RouterTabs = () => {

  // when triggerThemeKey is called in hooks/useColorScheme, it will cause component re-render by passing themeKey to TabBar's key prop
  const themeKey = useAppStore((state) => state.themeKey);

  const router = useRouter();
  return (
    <Tabs
      key={themeKey}
      initialRouteName='index'
      backBehavior='history'
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} key={tw.memoBuster} router={router} />}
    >
      <Tabs.Screen
        name='index'
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name='orders'
        options={{
          title: 'Order',
        }}
      />
      <Tabs.Screen
        name='listings'
        options={{
          title: 'Listings',
        }}
      />
      <Tabs.Screen
        name='sign-in'
        options={{
          title: 'SignIn',
        }}
      />
      <Tabs.Screen
        name='+not-found'
        options={{ href: null }}
      />
    </Tabs>
  );
};

export default RouterTabs;
