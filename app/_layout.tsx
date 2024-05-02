import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Linking, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ROUTES } from "@/src/utils/constants";
import * as Updates from 'expo-updates';
import { useDeviceContext, useAppColorScheme } from 'twrnc';
import tw from "../tw";

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
TextInput.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.maxFontSizeMultiplier = 1.4;
// @ts-ignore
TextInput.defaultProps.maxFontSizeMultiplier = 1.4;

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      onError: (error) => {
        if ("message" in error) {
          console.error(error.message);
        }
      }
    }
  },
});

const RootLayout = () => {

  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: `device`
  });

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

  const segments = useSegments();
  const isLogin = segments[segments.length - 1] === "(tabs)";
  const drawerTitle = isLogin ? "LOGIN" : segments.length > 0 ? segments[segments.length - 1].toLowerCase() : "";

  const runTypeMessage = Updates.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : 'This app is running an update';

  console.log('runTypeMessage', runTypeMessage)
  useReactQueryDevTools(client);
  return (
    <QueryClientProvider
      client={client}
    >
        <Drawer
          drawerContent={(props) => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItem label="Website" onPress={() => Linking.openURL("https://www.expo.dev/")} />
                <Link href={ROUTES.LOGIN} onPress={() => props.navigation.closeDrawer()}>
                  Login
                </Link>
                <Link href={ROUTES.HOME} onPress={() => props.navigation.closeDrawer()}>
                  Home
                </Link>
                <Link
                  href={{ pathname: ROUTES.DETAILS, params: { user: "evanbacon" } }}
                  onPress={() => props.navigation.closeDrawer()}
                >
                  Details
                </Link>
                <Link href={ROUTES.COUNTER} onPress={() => props.navigation.closeDrawer()}>
                  Counter
                </Link>
              </DrawerContentScrollView>
            );
          }}
          initialRouteName="/"
          screenOptions={{
            title: drawerTitle,
          }}
        />
    </QueryClientProvider>
  );
};

export default RootLayout;
