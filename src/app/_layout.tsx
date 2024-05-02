import { Stack } from 'expo-router';
import React from 'react';
import { useAppColorScheme, useDeviceContext } from 'twrnc';
import tw from '@/tw'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import InitApp from '@/components/InitApp';
import { StatusBar, View } from 'react-native'

export default function RootLayoutNav() {
  const [up, setUp] = React.useState(true)

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

  React.useEffect(() => {
    setUp(false)
    setTimeout(() => { setUp(true) }, 1)
  }, [colorScheme])

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
    //   {
    //   observeDeviceColorSchemeChanges: false,
    //   initialColorScheme: `light`, 
    // }
  );

  return (
    <QueryClientProvider client={client}>
      <View style={tw`flex-1 bg-background`}>
        {up && <StatusBar barStyle={colorScheme == "dark" ? 'dark-content' : 'light-content'} animated />}
        <InitApp>
          <Stack key={tw.memoBuster} >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
          </Stack>
        </InitApp>
      </View>
    </QueryClientProvider>
  );
}
