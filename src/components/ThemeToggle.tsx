import { colors } from '@/colors';
import useTheme from '@/hooks/useTheme';
import { useAppStore } from '@/stores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoonStar, Sun } from 'lucide-react-native';
import PressableOpacity from './PressableOpacity';

export function ThemeToggle() {
  const { isDark, colorScheme, setColorScheme } = useTheme();
  const triggerThemeKey = useAppStore((state) => state.triggerThemeKey);
  return (
    <PressableOpacity
      onPress={() => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(newTheme);
        triggerThemeKey()
        AsyncStorage.setItem('theme', newTheme);
      }}
    >
      {isDark ? (
        <MoonStar color={colors.muted.DEFAULT} size={23} strokeWidth={1.25} />
      ) : (
        <Sun color={colors.muted.DEFAULT} size={24} strokeWidth={1.25} />
      )}
    </PressableOpacity>
  );
}
