import { useAppStore } from '@/stores';
import tw from '@/tw';
import { useEffect } from 'react';
import { useAppColorScheme } from 'twrnc';

export default function useTheme() {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const triggerThemeKey = useAppStore((state) => state.triggerThemeKey);

  const switchTheme = () => {
    toggleColorScheme();
    triggerThemeKey();
  }

  // useEffect(() => {
  //   console.log("colorScheme", colorScheme)
  // }, [colorScheme ])

  return {
    colorScheme,
    switchTheme,
    setColorScheme,
    isDarkColorScheme: colorScheme === 'dark'
  };

}
