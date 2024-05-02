import { useAppStore } from '@/stores';
import tw from '@/tw';
import { useAppColorScheme } from 'twrnc';

export default function useColorScheme() {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const triggerThemeKey = useAppStore((state) => state.triggerThemeKey);
  
  const switchTheme = () => {
    toggleColorScheme();
    triggerThemeKey();
  }

  return { colorScheme, switchTheme, setColorScheme };

}