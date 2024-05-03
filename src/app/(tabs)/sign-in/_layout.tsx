import useTheme from '@/hooks/useTheme';
import { Stack, useFocusEffect } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
  const { isDarkColorScheme } = useTheme()

  useFocusEffect(() => {
    StatusBar.setBarStyle(isDarkColorScheme ? 'light-content' : 'dark-content')
  })

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
