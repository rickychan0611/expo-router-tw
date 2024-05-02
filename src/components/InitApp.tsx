import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Theme, ThemeProvider } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// import { NAV_THEME } from "~/lib/constants";
// import { useColorScheme } from '~/lib/useColorScheme';
// import { useColorScheme } from '@/components/useColorScheme';
import { useAppColorScheme } from "twrnc";
import tw from "@/tw";

SplashScreen.preventAutoHideAsync();

const InitApp = ({ children }: { children: React.ReactNode }) => {
  const [isAppReady, setIsAppReady] = React.useState(false)

  // const LIGHT_THEME: Theme = {
  //   dark: false,
  //   colors: NAV_THEME.light,
  // };
  // const DARK_THEME: Theme = {
  //   dark: true,
  //   colors: NAV_THEME.dark,
  // };

  const [fontsLoaded, fontError] = useFonts({
    'mi-100': require('../assets/fonts/MiSans-Thin.ttf'),
    'mi-200': require('../assets/fonts/MiSans-ExtraLight.ttf'),
    'mi-300': require('../assets/fonts/MiSans-Light.ttf'),
    'mi-400': require('../assets/fonts/MiSans-Normal.ttf'),
    'mi-500': require('../assets/fonts/MiSans-Regular.ttf'),
    'mi-600': require('../assets/fonts/MiSans-Medium.ttf'),
    'mi-700': require('../assets/fonts/MiSans-Semibold.ttf'),
    'mi-800': require('../assets/fonts/MiSans-Demibold.ttf'),
    'mi-900': require('../assets/fonts/MiSans-Bold.ttf'),
    'mi-1000': require('../assets/fonts/MiSans-Heavy.ttf')
  });

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  // const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  const loadTheme = async () => {
    const theme = await AsyncStorage.getItem('theme');
    console.log("load theme", theme)
    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    if (!theme) {
      AsyncStorage.setItem('theme', colorScheme + "");
      setIsColorSchemeLoaded(true);
      return;
    }
    const colorTheme = theme === 'dark' ? 'dark' : 'light';
    if (true) {
      setColorScheme(colorTheme);
      setIsColorSchemeLoaded(true);
      return;
    }
  }

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync()
    setIsAppReady(true)
  };


  React.useEffect(() => {
    loadTheme()
    // setColorScheme('dark')
    // setIsColorSchemeLoaded(true);
  }, [])

  React.useEffect(() => {
    if (fontsLoaded && isColorSchemeLoaded) {
      hideSplashScreen()
    }
  }, [fontsLoaded, isColorSchemeLoaded])



  // // initial queries
  // useEffect(() => {
  //   console.log("init user", userInfo.data)
  // }, [userInfo])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <>{isAppReady && children}</>
    </ThemeProvider>
  )
}

export default InitApp