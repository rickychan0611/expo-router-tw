import React, { useEffect, useState } from "react";
import tw from "@/tw";
import { View, ScrollView, Dimensions, KeyboardAvoidingView, Keyboard, StatusBar, Platform } from "react-native";
import { useOrdersStore, useAppStore } from "@/stores";
import { H5, Interact } from "@/components/Typography";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { Row, RowBetween } from "@/components/FlexViews";
import PressableOpacity from "@/components/PressableOpacity";
import { colors } from "@/colors";
import { useInfiniteQueryOrders } from "@/api/queryHooks/useProductQueries";
import { OrderFilterQueryParams } from "@/interfaces/productTypes";
import DatePicker from "../../DatePicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";

const OrderFilterOptions = ({ menuSize }: { menuSize: any }) => {
  const orders = useInfiniteQueryOrders()
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const orderFilter = useOrdersStore((state) => state.orderFilter)
  const setOrderFilter = useOrdersStore((state) => state.setOrderFilter)
  const setOpenFilterMenu = useOrdersStore((state) => state.setOpenFilterMenu)
  const orderFilterQueryParams = useOrdersStore((state) => state.orderFilterQueryParams)
  const setOrderFilterQueryParams = useOrdersStore((state) => state.setOrderFilterQueryParams)
  const tabBarHeight = useAppStore((state) => state.tabBarHeight)
  const topBarHeight = useOrdersStore((state) => state.topBarHeight)

  const [selectedStartDate, setSelectedStartDate] = React.useState({ year: "", month: "", day: "" })
  const [selectedEndDate, setSelectedEndDate] = React.useState({ year: "", month: "", day: "" })
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false)

  const handleApplyFilter = () => {
    const temp: OrderFilterQueryParams = { ...orderFilterQueryParams }
    temp.status = orderFilter
    temp.start_timestamp = selectedEndDate.day ? moment(`${selectedStartDate.year}-${selectedStartDate.month}-${selectedStartDate.day} 00:00:00`, 'YYYY-M-D HH:mm:ss', 'America/Los_Angeles').unix().toString() : ""
    temp.end_timestamp = selectedEndDate.day ? moment(`${selectedEndDate.year}-${selectedEndDate.month}-${selectedEndDate.day} 23:59:59`, 'YYYY-M-D HH:mm:ss', 'America/Los_Angeles').unix().toString() : ""
    console.log("selectedStartDate.year", selectedStartDate.year, selectedStartDate.month, selectedStartDate.day)
    console.log("selectedEndDate.year", selectedEndDate.year, selectedEndDate.month, selectedEndDate.day)
    console.log("temp", temp)
    setOrderFilterQueryParams(temp)
    setOpenFilterMenu(false)
  }

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (

    <KeyboardAwareScrollView
      style={[(Platform.OS === "android" && keyboardHeight > 0) && tw`h-[${Dimensions.get('window').height - keyboardHeight - topBarHeight - tabBarHeight + (StatusBar.currentHeight || 0)}px]`]}
    >

      <View style={tw`bg-card dark:bg-card-dark p-4 pb-6 rounded-b-m w-[${screenWidth}px] max-w-[500px]`}>
        <RowBetween>
          <H5 style={tw`text-neutral-900 dark:text-neutral-dark-900 my-2`}>
            Filter
          </H5>
          <PressableOpacity onPress={() => {
            setOrderFilter("all")
          }}>
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

        <RowBetween style={tw`pt-5`}>

          <H5> Date </H5>
          <PressableOpacity onPress={() => {
            setSelectedEndDate({ year: "", month: "", day: "" })
            setSelectedStartDate({ year: "", month: "", day: "" })
          }}>
            <Interact style={tw`text-neutral-400 dark:text-neutral-dark-500`}>
              Reset
            </Interact>
          </PressableOpacity>
        </RowBetween>

        <Row style={tw`mt-4 gap-4`}>
          <Interact style={tw`text-primary-800 dark:text-primary-dark-800 w-15`}>
            From
          </Interact>
          <DatePicker
            selectedDate={selectedStartDate}
            setSelectedDate={setSelectedStartDate}
            showDatePicker={showStartDatePicker}
            setShowDatePicker={setShowStartDatePicker}
          />
        </Row>
        <Row style={tw`mt-4 gap-4`}>
          <Interact style={tw`text-primary-800 dark:text-primary-dark-800 w-15`}>
            To
          </Interact>
          <DatePicker
            selectedDate={selectedEndDate}
            setSelectedDate={setSelectedEndDate}
            showDatePicker={showEndDatePicker}
            setShowDatePicker={setShowEndDatePicker}
          />
        </Row>

        <View style={tw`mt-8`}>
          <Button
            variant="secondary"
            onPress={handleApplyFilter}
          >
            Apply
          </Button>
        </View>
      </View >
    </KeyboardAwareScrollView>
  )
}

export default OrderFilterOptions