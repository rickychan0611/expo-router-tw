import OrderDeatailTopBar from '@/components/ui/orders/OrderDeatailTopBar'
import tw from '@/tw'
import React from 'react'
import { View } from 'react-native'

type Props = {}

const OrderDetail = (props: Props) => {
  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark`}>
      <OrderDeatailTopBar />
    </View>
  )
}

export default OrderDetail