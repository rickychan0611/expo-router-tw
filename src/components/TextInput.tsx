import React from 'react'
import tw from '@/tw'
import { TextInput as RNTextInput } from 'react-native'

const TextInput = ({ style, ...props }: any) => {

  return (
    <RNTextInput
      style={[
        tw`p-2 bg-input sm:bg-background rounded text-black placeholder:text-muted`,
        , style]}
      {...props}
      maxFontSizeMultiplier={1.5}
      placeholderTextColor={'#9CA3AF'}
    />
  )
}

export default TextInput
