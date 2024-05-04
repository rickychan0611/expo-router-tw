import { View } from "react-native";
import { Subhead, Interact, P1, Small } from "@/components/Typography";
import Card from "@/components/Card";
import { RowBetween, Row } from "@/components/FlexViews";
import Divider from "@/components/Divider";
import { MoreHorizontal } from "lucide-react-native";
import { colors } from "@/colors";
import tw from "@/tw";

type Props = {}

const OrderCard = ({}: Props) => {
  return (
    <Card>
      <RowBetween style={tw`items-start`}>
        <Subhead>id number</Subhead>
        <View style={tw`justify-end`}>
          <Small style={tw`text-muted text-right`}>12:59 am</Small>
          <Interact style={tw`text-success text-right`}>
            Delivered
          </Interact>
        </View>
      </RowBetween>
      <Divider style={tw`my-2`} />
      <RowBetween>
        <P1 style={{ color: colors.primary[600] }}>
          23 items
        </P1>
        <P1 style={tw`text-neutral-900`}>
          $12,00
        </P1>
      </RowBetween>
      <Row style={tw`mt-2 gap-2`}>
        <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
        <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
        <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
        <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
        <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
        <View style={tw`flex-1 justify-center items-center bg-neutral-200 h-[52px] max-w-[52px] rounded`}>
          <MoreHorizontal color={colors.neutral[900]} />
        </View>
      </Row>
    </Card>
  )
}

export default OrderCard
