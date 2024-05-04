import React from 'react'
import { View } from 'react-native'
import tw from '@/tw'

const Divider = ({ style, ...props }: any) => {
  return (
    <View {...props}
      style={[tw`h-[2px] w-full border-b border-neutral-200 dark:border-muted-dark`, style]}/>
  )
}

export default Divider
