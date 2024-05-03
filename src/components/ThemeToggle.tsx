import { colors } from '@/colors';
import useColorScheme from '@/hooks/useColorScheme';
import { useAppStore } from '@/stores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoonStar, Sun } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export function ThemeToggle() {
  const { isDarkColorScheme, colorScheme, setColorScheme } = useColorScheme();
  const triggerThemeKey = useAppStore((state) => state.triggerThemeKey);
  return (
    <TouchableOpacity
      onPress={() => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(newTheme);
        triggerThemeKey()
        AsyncStorage.setItem('theme', newTheme);
      }}
    >
      {isDarkColorScheme ? (
        <MoonStar color={colors.muted.DEFAULT} size={23} strokeWidth={1.25} />
      ) : (
        <Sun color={colors.muted.DEFAULT} size={24} strokeWidth={1.25} />
      )}
    </TouchableOpacity>
  );
}
