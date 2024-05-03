import React from 'react'
import tw from '@/tw'
import { TextInput as RNTextInput } from 'react-native'

const TextInput = (props: any) => {

  return (
    <RNTextInput
      {...props}
      style={[
        tw`p-3 mt-10 w-full bg-input sm:bg-background rounded text-black placeholder:text-muted`,
      ]}
      maxFontSizeMultiplier={1.5}
      placeholderTextColor={'#9CA3AF'}
    />
  )
}

export default TextInput
