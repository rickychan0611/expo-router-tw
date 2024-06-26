import "@expo/metro-runtime"
import { Stack } from 'expo-router';
import React from 'react';
import { useAppColorScheme, useDeviceContext } from 'twrnc';
import tw from '@/tw'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import InitApp from '@/components/InitApp';
import { StatusBar, Text, TextInput, View } from 'react-native'
import { useAppState } from "@/hooks/useAppState";
import useColorScheme from "@/hooks/useTheme";
import { useAppStore } from "@/stores";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
TextInput.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.maxFontSizeMultiplier = 1.5
// @ts-ignore
TextInput.defaultProps.maxFontSizeMultiplier = 1.5

export default function RootLayoutNav() {
  const [up, setUp] = React.useState(true)
  // const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const { isDark } = useColorScheme()

  React.useEffect(() => {
    setUp(false)
    setTimeout(() => { setUp(true) }, 1)
  }, [isDark])

  const client = new QueryClient({
    defaultOptions: {
      // queries: {
      //   staleTime: 1000 * 60 * 5, // 5 minutes   
      // },
      mutations: {
        onError: (error) => {
          if ("message" in error) {
            console.error(error.message);
          }
        }
      }
    },
  });

  useReactQueryDevTools(client);

  useDeviceContext(tw,
    {
      observeDeviceColorSchemeChanges: false,
      initialColorScheme: `light`,
    }
  );

  const themekey = useAppStore((state) => state.themeKey);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        {up && <StatusBar barStyle="light-content" />}
        <InitApp>
          <Stack
            // key={themekey}
            screenOptions={{ headerShown: false }}
          />
        </InitApp>
      </QueryClientProvider >
    </GestureHandlerRootView>
  );
}
