import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

//styling
import { Text, View, TouchableOpacity, Modal } from 'react-native';

import {RowBetween } from './FlexViews';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '@/tw';

type Props = {
  children: React.ReactNode
}

const AppBarContainer = ({ children }: Props) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[tw`bg-primary dark:bg-primary-dark z-50 w-full flex flex-row justify-between items-center px-sm`,
    { paddingTop: insets.top + 8 }]}>
      <RowBetween style={tw`flex-1 gap-4`}>
        {children}
      </RowBetween>
    </View >
  )
}

export default AppBarContainer