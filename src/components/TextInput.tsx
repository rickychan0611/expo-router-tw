import React from 'react'
import tw from '@/tw'
import { Platform, TextInput as RNTextInput } from 'react-native'

const TextInput = ({ style, ...props }: any) => {
  const outlineWidth = Platform.OS === 'web' ? { outlineWidth: 0 } : ""
  return (
    <RNTextInput
      style={[
        tw`p-3 bg-input sm:bg-background rounded text-black placeholder:text-muted`,
        , style, outlineWidth]}
      {...props}
      maxFontSizeMultiplier={1.5}
      placeholderTextColor={'#9CA3AF'}
    />
  )
}

export default TextInput
