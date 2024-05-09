import useTheme from '@/hooks/useTheme';
import { useAppStore } from '@/stores';
import { Stack, useFocusEffect } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
  const { isDarkColorScheme } = useTheme()

  useFocusEffect(() => {
    StatusBar.setBarStyle(isDarkColorScheme ? 'light-content' : 'dark-content')
  })
  const themeKey = useAppStore((state) => state.themeKey);

  return (

    <Stack
      key={themeKey}
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
