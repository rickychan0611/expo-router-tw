import React from "react";
import tw from "@/tw";
import { View, ScrollView, Dimensions } from "react-native";
import { useOrdersStore } from "@/stores";
import { H5, Interact } from "@/components/Typography";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { Row, RowBetween } from "@/components/FlexViews";
import PressableOpacity from "@/components/PressableOpacity";
import { colors } from "@/colors";
import { useInfiniteQueryOrders } from "@/api/queryHooks/useProductQueries";
import { OrderFilterQueryParams } from "@/interfaces/productTypes";
import DatePicker from "./DatePicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const OrderFilterOptions = () => {
  const orderFilter = useOrdersStore((state) => state.orderFilter)
  const setOrderFilter = useOrdersStore((state) => state.setOrderFilter)
  const setOpenFilterMenu = useOrdersStore((state) => state.setOpenFilterMenu)
  const screenWidth = Dimensions.get('window').width

  const orderFilterQueryParams = useOrdersStore((state) => state.orderFilterQueryParams)
  const setOrderFilterQueryParams = useOrdersStore((state) => state.setOrderFilterQueryParams)
  const orders = useInfiniteQueryOrders()

  const handleApplyFilter = () => {
    const temp: OrderFilterQueryParams = { ...orderFilterQueryParams }
    temp.status = orderFilter
    setOrderFilterQueryParams(temp)
    orders.refetch()
    setOpenFilterMenu(false)
  }

  return (
    <View style={tw`bg-card dark:bg-card-dark p-4 pb-6 rounded-b-m w-[${screenWidth}px] max-w-[500px]`}>

      {/* <DatePicker /> */}
      <RowBetween>
        <H5 style={tw`text-neutral-900 dark:text-neutral-dark-900 my-2`}>
          Filter
        </H5>
        <PressableOpacity onPress={() => { setOrderFilter("all") }}>
          <Interact style={tw`text-neutral-400 dark:text-neutral-dark-500`}>
            Reset
          </Interact>
        </PressableOpacity>
      </RowBetween>

      <ScrollView horizontal>
        <Row style={tw`flex-1 mt-2 gap-1 pb-6 border-b border-neutral-200 dark:border-muted-dark`}>
          <Button
            color={orderFilter === "new" ? colors.primary[300] : colors.neutral[100]}
            darkColor={orderFilter === "new" ? colors.primary.dark.DEFAULT : colors.neutral[800]}
            style={tw`rounded-full`}
            onPress={() => {
              setOrderFilter("new")
            }}
          >
            New
          </Button>
          <Button
            color={orderFilter === "delivering" ? colors.primary[300] : colors.neutral[100]}
            darkColor={orderFilter === "delivering" ? colors.primary.dark.DEFAULT : colors.neutral[800]}
            onPress={() => setOrderFilter("delivering")}
            style={tw`rounded-full`}
          >
            Delivering
          </Button>
          <Button
            color={orderFilter === "delivered" ? colors.primary[300] : colors.neutral[100]}
            darkColor={orderFilter === "delivered" ? colors.primary.dark.DEFAULT : colors.neutral[800]}
            onPress={() => setOrderFilter("delivered")}
            style={tw`rounded-full`}
          >
            Delivered
          </Button>
          <Button
            color={orderFilter === "cancelled" ? colors.primary[300] : colors.neutral[100]}
            darkColor={orderFilter === "cancelled" ? colors.primary.dark.DEFAULT : colors.neutral[800]}
            onPress={() => setOrderFilter("cancelled")}
            style={tw`rounded-full`}
          >
            Cancelled
          </Button>
        </Row>
      </ScrollView >
      <H5 style={tw`pt-5`}>
        Date
      </H5>
      <Row style={tw`mt-4 gap-4`}>
        <Interact style={tw`text-primary-800 dark:text-primary-dark-800 w-15`}>
          From
        </Interact>
        <DatePicker
          placeholder="Start Date"
        />
      </Row>
      <Row style={tw`mt-4 gap-4`}>
        <Interact style={tw`text-primary-800 dark:text-primary-dark-800 w-15`}>
          To
        </Interact>
        <DatePicker
          placeholder="End Date"
        />
      </Row>

      <View style={tw`mt-8`}>
        <Button
          onPress={handleApplyFilter}>
          Apply
        </Button>
      </View>

    </View>
  )
}

export default OrderFilterOptions