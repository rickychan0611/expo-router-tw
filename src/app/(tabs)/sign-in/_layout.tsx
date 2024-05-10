import useTheme from '@/hooks/useTheme';
import { Stack, useFocusEffect } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
  const { isDark } = useTheme()

  useFocusEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content')
  })

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
