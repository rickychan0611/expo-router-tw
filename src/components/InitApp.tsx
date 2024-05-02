import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { useAppColorScheme } from "twrnc";
import tw from "@/tw";

SplashScreen.preventAutoHideAsync();

const InitApp = ({ children }: { children: React.ReactNode }) => {
  const [isAppReady, setIsAppReady] = React.useState(false)

  const [fontsLoaded, fontError] = useFonts({
    'mi': require('../assets/fonts/MiSans-VF.ttf')
  });

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
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
  }, [])
  
  React.useEffect(() => {
    if (fontsLoaded && isColorSchemeLoaded) {
      console.log("fontsLoaded", fontsLoaded)
      hideSplashScreen()
    }
  }, [fontsLoaded, isColorSchemeLoaded])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <>{isAppReady && children}</>
    </ThemeProvider>
  )
}

export default InitApp