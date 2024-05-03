import React from 'react'
import { View, Text } from 'react-native'
import tw from '@/tw'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = ({ children }: { children: React.ReactNode }) => {

  const insets = useSafeAreaInsets();

  return (
    <View style={[tw`flex-1 w-full justify-center items-center bg-background`]}>
      <View style={[tw`flex-1 w-full lg:container lg:mx-auto`]}>
        {children}
      </View>
    </View>
  )
}

export default Container
