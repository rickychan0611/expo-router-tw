import { View } from "react-native";
import { Subhead, Interact, P1, Small } from "@/components/Typography";
import Card from "@/components/Card";
import { RowBetween, Row } from "@/components/FlexViews";
import Divider from "@/components/Divider";
import { MoreHorizontal } from "lucide-react-native";
import { colors } from "@/colors";
import tw from "@/tw";
import { Order, OrderItem } from "@/interfaces/productTypes";
import moment from "moment";
import { Image } from "expo-image";

type Props = {
  item: Order
}

const OrderCard = ({ item }: Props) => {
  const order_items: any = JSON.parse(item?.order_items_str || "[]")
  const URL = process.env.EXPO_PUBLIC_HOST_URL + "/"

  return (
    <View style={tw`w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2 `}>
      <Card style={tw``} >
        <RowBetween style={tw`items-start`}>
          <Subhead>{item.order_id}</Subhead>
          <View style={tw`justify-end`}>
            <Small style={tw`text-muted text-right`}>
              {moment(item.place_time).format("YYYY-MM-DD HH:mm")}
            </Small>
            <Interact style={tw`text-success text-right`}>
              {item.status}
            </Interact>
          </View>
        </RowBetween>
        <Divider style={tw`my-2`} />
        <RowBetween>
          <P1 style={tw`text-primary-600 dark:text-primary-dark-700`}>
            {order_items.length} {order_items.length > 1 ? "items" : "item"}
          </P1>
          <P1 style={tw`text-neutral-900`}>
            ${item.pay_amount}
          </P1>
        </RowBetween>
        <Row style={tw`mt-2 gap-2`}>
          {order_items?.[0] && order_items.map((orderItem: OrderItem, i: number) => {
            const pic: any = JSON.parse(orderItem.product_pic)
            const uri = URL + '/storage/' + pic[0]
            if (i < 6) return (
              <View style={tw`flex-1 bg-white h-[52px] max-w-[52px] rounded`} key={i}>
                <Image style={tw`w-full h-full`}
                  contentFit="cover"
                  source={{ uri }}
                />
              </View>
            )
          })}
          {order_items.length >= 6 && <View style={tw`flex-1 justify-center items-center bg-neutral-50 dark:bg-neutral-800 h-[52px] max-w-[52px] rounded `}>
            <MoreHorizontal color={colors.neutral[900]} />
          </View>}
        </Row>
      </Card>
    </View>
  )
}

export default OrderCard
