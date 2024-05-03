import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

//styling
import { Text, View, TouchableOpacity, Modal } from 'react-native';

//navigation
import { useTranslation } from 'react-i18next';

// icons
import logo from '~/assets/icons/app-icon-circle.png'
import { Row, RowBetween } from './FlexViews';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { H2, H3, H4 } from './Typography';
import { Image } from 'expo-image';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import tw
  from '@/tw';
type Props = {
  children: React.ReactNode
}

const AppBarContainer = ({ children }: Props) => {
  const insets = useSafeAreaInsets()
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
    <View style={[tw`bg-primary dark:bg-primary-dark z-50 w-full flex flex-row justify-between items-center px-4 lg:px-10`, { paddingTop: insets.top + 8 }]}
    >
      <RowBetween style={tw`flex-1 gap-4`}>
        {children}

        <Row style={tw`gap-1`}>
          <LanguageToggle />
          <ThemeToggle />
        </Row>

      </RowBetween>
    </View >
  )
}

export default AppBarContainer