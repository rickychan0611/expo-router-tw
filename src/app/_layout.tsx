import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useDeviceContext } from 'twrnc';
import { useColorScheme } from '@/components/useColorScheme';
import tw from '@/tw'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();
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
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
