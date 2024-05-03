import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import React from "react";
import {Appearance} from 'react-native';
import useTheme from "@/hooks/useTheme";

SplashScreen.preventAutoHideAsync();

const InitApp = ({ children }: { children: React.ReactNode }) => {
  const [isAppReady, setIsAppReady] = React.useState(false)

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

  // const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  // const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { colorScheme, switchTheme, setColorScheme, isDarkColorScheme } = useTheme()

  const loadTheme = async () => {
    console.log("colorScheme", Appearance.getColorScheme())
    setColorScheme(Appearance.getColorScheme())
    // const theme = await AsyncStorage.getItem('theme');
    // console.log("load theme", theme)
    // if (Platform.OS === 'web') {
    //   // Adds the background color to the html element to prevent white background on overscroll.
    //   document.documentElement.classList.add('bg-background');
    // }
    // if (!theme) {
    //   AsyncStorage.setItem('theme', colorScheme + "");
    //   setIsColorSchemeLoaded(true);
    //   return;
    // }
    // const colorTheme = theme === 'dark' ? 'dark' : 'light';
    // if (true) {
    //   setColorScheme(colorTheme);
    //   setIsColorSchemeLoaded(true);
    //   return;
    // }
  }

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync()
    setIsAppReady(true)
  };


  React.useEffect(() => {
    loadTheme()
  }, [])

  React.useEffect(() => {
    if (fontsLoaded) {
      console.log("fontsLoaded", fontsLoaded)
      hideSplashScreen()
    }
  }, [fontsLoaded])

  return (
    <>{fontsLoaded && children}</>
  )
}

export default InitApp