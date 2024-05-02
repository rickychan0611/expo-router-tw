import { colors } from '@/colors';
import useColorScheme from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoonStar, Sun } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export function ThemeToggle() {
  const { isDarkColorScheme, colorScheme, setColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={() => {
        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(newTheme);
        AsyncStorage.setItem('theme', newTheme);
      }}
    >
      {isDarkColorScheme ? (
        <MoonStar color={colors.muted} size={23} strokeWidth={1.25} />
      ) : (
        <Sun color={colors.muted} size={24} strokeWidth={1.25} />
      )}
    </TouchableOpacity>
  );
}
