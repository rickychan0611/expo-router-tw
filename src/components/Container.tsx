import React from 'react'
import { View, Text } from 'react-native'
import tw from '@/tw'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = ({ children }: { children: React.ReactNode }) => {

  const insets = useSafeAreaInsets();

  return (
    <View style={[tw`p-2 pb-10 flex-1 w-full items-center bg-background dark:bg-background-dark`]}>
      <View style={[tw`w-full max-w-6xl`]}>
        {children}
      </View>
    </View>
  )
}

export default Container
