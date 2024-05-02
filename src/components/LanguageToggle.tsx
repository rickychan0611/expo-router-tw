import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { getLocales } from 'expo-localization';
import { useTranslation } from 'react-i18next';
import useColorScheme from '@/hooks/useColorScheme';
import { colors } from '@/colors';
import { Globe } from 'lucide-react-native';
import tw from '@/tw';

export function LanguageToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [t, i18n] = useTranslation("common")

  useEffect(() => {
    const getSystemLanguage = async () => {
      const locale: string | null = await AsyncStorage.getItem("locale") || ""
      if (locale) {
        await i18n.changeLanguage(locale)
      }
      else {
        const code = getLocales()[0].languageCode === "zh" ? "cn" : "en"
        await i18n.changeLanguage(code)
        await AsyncStorage.setItem("locale", code)
      }
    }
    getSystemLanguage()
  }, [])

  const changeLanguage = async () => {
    if (i18n.language === "cn") {
      await i18n.changeLanguage("en")
    }
    else await i18n.changeLanguage("cn")
    await AsyncStorage.setItem("locale", i18n.language)
  }

  return (
    <TouchableOpacity style={tw`text-sm flex flex-row flex-nowrap items-center p-1 rounded-lg mr-2`}
      onPress={async () => changeLanguage()} >
      <Globe color={colors.muted.DEFAULT} size={23} strokeWidth={1.25} />
      <Text style={tw`text-muted`}>{i18n.language === "cn" ? "EN" : "中"}</Text>
    </TouchableOpacity>
  );
}
