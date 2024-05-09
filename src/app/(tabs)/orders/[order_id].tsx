import { useOrder } from '@/api/queryHooks/useProductQueries'
import { colors } from '@/colors'
import Card from '@/components/Card'
import Divider from '@/components/Divider'
import { Center, Row, RowBetween } from '@/components/FlexViews'
import LoadingModal from '@/components/LoadingModal'
import { H4, Interact, P1, P2, Small, Subhead, Subtle } from '@/components/Typography'
import OrderDeatailTopBar from '@/components/ui/orders/OrderDeatailTopBar'
import useTheme from '@/hooks/useTheme'
import { Buyer, OrderItem } from '@/interfaces/productTypes'
import tw from '@/tw'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { ChevronRight, Clock, Phone, Truck, UserCircle } from 'lucide-react-native'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

type Props = {}

const OrderDetail = (props: Props) => {
  const { isDarkColorScheme } = useTheme()
  const { t, i18n } = useTranslation("common")
  const { order_id } = useLocalSearchParams()
  const order = useOrder(order_id as string)

  const OrderInfoSection = () => {
    const InfoCardContents = ({ Icon, label, content }: { Icon: any, label: string, content: string }) => {
      const IconComponent = Icon
      return (
        <Row style={tw`gap-3 w-full sm:w-1/2 p-2`}>
          <Center style={tw`bg-secondary-100 dark:bg-secondary-200 p-2 rounded-full`}>
            <IconComponent size={24} color={isDarkColorScheme ? colors.secondary[400] : colors.secondary[600]} />
          </Center>
          <View style={tw`flex-1`}>
            <Small style={tw`text-muted`}>{label}</Small>
            <P2>{content}</P2>
          </View>
        </Row>
      )
    }

    const buyer: Buyer | any = order?.data?.buyer_str ? JSON.parse(order?.data?.buyer_str) : ""

    return (
      <>
        <Interact style={tw`p-2 my-2 text-muted`}>
          Order Information
        </Interact>
        <Card>
          <View style={tw`flex-row flex-wrap m-[-8px]`}>
            <InfoCardContents Icon={Clock} label={t`Order time`} content={moment(order?.data.place_time).format("YYYY-MM-DD HH:mm")} />
            <InfoCardContents Icon={UserCircle} label={t`buyer`} content={buyer.contact_name} />
            <InfoCardContents Icon={Phone} label={t`Contact`} content={buyer.business_phone} />
            <InfoCardContents Icon={Truck} label={t`Shipping Address`} content={buyer.business_address + ", " + buyer.business_post_code} />
          </View>
          {/* <Divider style={tw`my-4`} /> */}
          {/* <Subtle style={tw`text-muted`}>
            Order note:
          </Subtle>
          <P1>please take your time</P1> */}
        </Card>
      </>
    )
  }

  const OrderItemsSection = () => {
    const Item = ({ item }: { item: OrderItem }) => {
      const pic: any = JSON.parse(item.product_pic)
      const uri = process.env.EXPO_PUBLIC_HOST_URL + '/storage/' + pic[0]

      return (
        <RowBetween style={tw`w-full sm:w-1/2 md:w-1/2 items-start p-2`}>
          {/* <Image /> */}
          <View style={tw`w-16 h-16 bg-white rounded`}>
            <Image style={tw`w-full h-full`}
              contentFit="contain"
              source={{ uri }}
            />
          </View>
          <Row style={tw`flex-1 pl-2 sm:pl-4 `}>
            <View style={tw`flex-1 `}>
              <Small>{item?.supply_order_id}</Small>
              <Interact style={tw`dark:text-white`} numberOfLines={2}>
                {i18n.language === "cn" ? item?.product_name_cn : item?.product_name_en}
              </Interact>
              <Small style={tw`dark:text-white mt-1`} numberOfLines={2}>
                {"Packing: "}{item?.product_packing_info}
              </Small>
              <Small style={tw`dark:text-white`} numberOfLines={2}>
                {"Qty: "}{item?.product_quantity}
              </Small>
            </View>
          </Row>
        </RowBetween>
      )
    }

    return (
      <>
        <Interact style={tw`p-2 my-2 text-muted`}>
          Order items
        </Interact>
        <Card>
          <Row style={tw`flex-wrap m-[-8px] mt-[-12px]`}>
            {order?.data?.order_items[0] && order.data.order_items.map((item: OrderItem) => (
              <Item item={item} key={item.id} />
            ))}
          </Row>
        </Card>
      </>
    )
  }

  const PayAmountSection = () => {
    return (
      <>
        <Interact style={tw`p-2 my-2 text-muted`}>
          Pay amount
        </Interact>
        <Card>
          <RowBetween>
            <H4>Total</H4>
            <Subhead>${order?.data?.product_total_amount}</Subhead>
          </RowBetween>
          <Divider style={tw`my-2`} />
          <RowBetween style={tw`mb-2`}>
            <Subtle style={tw`text-muted`}>
              Subtotal
            </Subtle>
            <P1 style={tw`text-muted`}> ${order?.data?.product_raw_amount}</P1>
          </RowBetween>
          <RowBetween style={tw`mb-2`}>
            <Subtle style={tw`text-muted`}>
              GST
            </Subtle>
            <P1 style={tw`text-muted`}> ${order.data.product_gst_amount}</P1>
          </RowBetween>
          <RowBetween style={tw`mb-2`}>
            <Subtle style={tw`text-muted`}>
              PST
            </Subtle>
            <P1 style={tw`text-muted`}> ${order.data.product_pst_amount}</P1>
          </RowBetween>
        </Card>
      </>
    )
  }

  const ActionSection = () => {
    return (
      <>
        <Interact style={tw`p-2 my-2 text-muted`}>
          Order Status
        </Interact>
        <Card>
          <RowBetween>
            <View>
              <Interact>action</Interact>
              <P1>waiting respond</P1>
            </View>
            <ChevronRight color={useTheme().isDarkColorScheme ? 'white' : 'black'}/>
          </RowBetween>
        </Card>
      </>
    )
  }

  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark `}>
      <OrderDeatailTopBar />
      {order.isLoading ? <LoadingModal /> :
        <ScrollView style={tw`p-2`}>
          <View style={tw`w-full max-w-6xl mx-auto mb-10`}>
            <ActionSection />
            <OrderInfoSection />
            <OrderItemsSection />
            <PayAmountSection />
          </View>
        </ScrollView >}
    </View >
  )
}

export default OrderDetail
