import { colors } from '@/colors'
import Card from '@/components/Card'
import Divider from '@/components/Divider'
import { Center, Row, RowBetween } from '@/components/FlexViews'
import { H4, Interact, P1, P2, Small, Subhead, Subtle } from '@/components/Typography'
import OrderDeatailTopBar from '@/components/ui/orders/OrderDeatailTopBar'
import useTheme from '@/hooks/useTheme'
import tw from '@/tw'
import { Clock, Phone, Truck, UserCircle } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

type Props = {}

const OrderDetail = (props: Props) => {
  const { isDarkColorScheme } = useTheme()
  const { t } = useTranslation("common")

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
    return (
      <>
        <Interact style={tw`p-2 my-2 text-muted`}>
          Order Information
        </Interact>
        <Card>
          <View style={tw`flex-row flex-wrap m-[-8px]`}>
            <InfoCardContents Icon={Clock} label={t`Order time`} content={"2022-01-01"} />
            <InfoCardContents Icon={UserCircle} label={t`buyer`} content={"John"} />
            <InfoCardContents Icon={Phone} label={t`Contact`} content={"+1 123 456 789"} />
            <InfoCardContents Icon={Truck} label={t`Shipping Address`} content={"123 Majkjlk fja;k fklaj f;kljas; dlfj;a slfj;ka sf;ljs dfj din St"} />
          </View>
          <Divider style={tw`my-4`} />
          <Subtle style={tw`text-muted`}>
            Order note:
          </Subtle>
          <P1>please take your time</P1>
        </Card>
      </>
    )
  }

  const OrderItemsSection = () => {
    const Item = () => {
      return (
        <RowBetween style={tw`w-full sm:w-1/2 md:w-1/2 items-start sm:mb-6 p-2`}>
          {/* <Image /> */}
          <View style={tw`h-14 w-14 bg-muted rounded mt-1`}></View>
          <Row style={tw`flex-1 pl-2 sm:pl-4 `}>
            <View style={tw`flex-1 `}>
              <Small>{"product id"}</Small>
              <Interact style={tw`dark:text-white`} numberOfLines={2}>
                {"product name jfksdj flkjsd fkdj flkjdflkjd flkjsd lfdj flkjsd fkdj flkjdflkjd flkjsd lfjsd ;fljs lfkj ldfjslk fjkls "}
              </Interact>
              <Small style={tw`dark:text-white mt-1`} numberOfLines={2}>
                {"Packing:"}
              </Small>
              <Small style={tw`dark:text-white`} numberOfLines={2}>
                {"Qty:"}
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
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </Row>
        </Card>
      </>
    )
  }

  const PayAmountSection = () => {
    const Item = () => {
      return (
        <RowBetween style={tw`w-full sm:w-1/2 md:w-1/2 items-start sm:mb-6 p-2`}>
          {/* <Image /> */}
          <View style={tw`h-14 w-14 bg-muted rounded mt-1`}></View>
          <Row style={tw`flex-1 pl-2 sm:pl-4 `}>
            <View style={tw`flex-1 `}>
              <Small>{"product id"}</Small>
              <Interact style={tw`dark:text-white`} numberOfLines={2}>
                {"product name jfksdj flkjsd fkdj flkjdflkjd flkjsd lfdj flkjsd fkdj flkjdflkjd flkjsd lfjsd ;fljs lfkj ldfjslk fjkls "}
              </Interact>
              <Small style={tw`dark:text-white mt-1`} numberOfLines={2}>
                {"Packing:"}
              </Small>
              <Small style={tw`dark:text-white`} numberOfLines={2}>
                {"Qty:"}
              </Small>
            </View>
          </Row>
        </RowBetween>
      )
    }

    return (
      <>
        <Interact style={tw`p-2 my-2 text-muted`}>
          Pay amount
        </Interact>
        <Card>
          <RowBetween>
            <H4>Total</H4>
            <Subhead>$ 0.00</Subhead>
          </RowBetween>
          <Divider style={tw`my-2`} />
          <RowBetween style={tw`mb-2`}>
            <Subtle style={tw`text-muted`}>
              Subtotal
            </Subtle>
            <P1 style={tw`text-muted`}> $ 0.00</P1>
          </RowBetween>
          <RowBetween style={tw`mb-2`}>
            <Subtle style={tw`text-muted`}>
              GST
            </Subtle>
            <P1 style={tw`text-muted`}> $ 0.00</P1>
          </RowBetween>
          <RowBetween style={tw`mb-2`}>
            <Subtle style={tw`text-muted`}>
              PST
            </Subtle>
            <P1 style={tw`text-muted`}> $ 0.00</P1>
          </RowBetween>
        </Card>
      </>
    )
  }

  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark `}>
      <OrderDeatailTopBar />
      <ScrollView style={tw`p-2`}>
        <View style={tw`w-full max-w-6xl mx-auto mb-10`}>
          <OrderInfoSection />
          <OrderItemsSection />
          <PayAmountSection />
        </View>
      </ScrollView >
    </View >
  )
}

export default OrderDetail
