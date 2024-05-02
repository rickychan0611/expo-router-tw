import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "@/tw";
import TabBar from "@/components/TabBar";

const RouterTabs = () => {
  return (
    <Tabs
      key={tw.memoBuster}
      initialRouteName='sign-in'
      backBehavior='history'
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
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
