import React from 'react'
import tw from '@/tw'
import { View, ViewProps } from 'react-native'

interface Props extends ViewProps {
}

const Card = (props: Props) => {
  return (
    <View style={[tw`bg-card dark:bg-card-dark p-ml rounded-sm`, props.style]}>
      {props.children}
    </View>
  )
}

export default Card
