import React from 'react'
import tw from '@/tw'
import { Platform, TextInput as RNTextInput } from 'react-native'

const TextInput = ({ style, ...props }: any) => {
  const outlineWidth = Platform.OS === 'web' ? { outlineWidth: 0 } : ""
  return (
    <RNTextInput
      {...props}
      style={[
        tw`p-3 bg-input dark:bg-input-dark dark:text-white sm:bg-background rounded text-black placeholder:text-muted`,
        , style, outlineWidth]}
      maxFontSizeMultiplier={1.5}
      placeholderTextColor={'#9CA3AF'}
    />
  )
}

export default TextInput
