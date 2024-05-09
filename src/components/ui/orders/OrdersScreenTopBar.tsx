import React from "react";
import tw from "@/tw";
import { View, StatusBar } from "react-native";
import { useOrdersStore } from "@/stores";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "expo-router";
import AppBarContainer from "@/components/AppBarContainer";
import { H4 } from "@/components/Typography";
import TextInput from "@/components/TextInput";
import { Row, RowBetween } from "@/components/FlexViews";
import { ListFilter, Search } from "lucide-react-native";
import PressableOpacity from "@/components/PressableOpacity";
import { colors } from "@/colors";
import SlideDownMenu from "@/components/ui/orders/SlideDownMenu";
import { OrderFilter } from "@/interfaces/productTypes";

const OrdersScreenTopBar = ( ) => {
  const [t, i18n] = useTranslation("common")
  const topBarHeight = useOrdersStore((state) => state.topBarHeight)
  const setTopBarHeight = useOrdersStore((state) => state.setTopBarHeight)

  const openFilterMenu = useOrdersStore((state) => state.openFilterMenu)
  const setOpenFilterMenu = useOrdersStore((state) => state.setOpenFilterMenu)
  const orderFilterQueryParams = useOrdersStore((state) => state.orderFilterQueryParams)

  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content')
  })

  // Get the height of the TopBar
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setTopBarHeight(height);
  };
 
  const status = (status: OrderFilter) => {
    switch (status) {
      case "all":
        return t("All Orders")
      case "new":
        return t("New")
      case "delivering":
        return t("Delivering")
      case "cancelled":
        return t("Cancelled")
      case "delivered":
        return t("Delivered")
    }  
  }

  return (
    <>
      <View style={tw`z-50`} onLayout={onLayout}>
        <AppBarContainer>
          <View style={tw`flex-1 max-w-6xl mx-auto`}>
            <H4 style={tw`text-white text-center`}>
             {status(orderFilterQueryParams.status)} 
            </H4>
            <RowBetween style={tw`mt-2 gap-2`}>
              <Row style={tw`bg-input dark:bg-input-dark rounded flex-1`}>
                <View style={tw`pl-2`}>
                  <Search color={colors.muted.DEFAULT} />
                </View>
                <TextInput style={tw`flex-1 bg-input dark:bg-input-dark`}
                  placeholder="Search Order"
                />
              </Row>
              <PressableOpacity onPress={() => { setOpenFilterMenu(!openFilterMenu) }}>
                <ListFilter style={tw`text-white`} />
              </PressableOpacity>
            </RowBetween>
          </View>
        </AppBarContainer >
        <View style={tw`h-3 bg-primary dark:bg-primary-dark`} />
      </View>

      <SlideDownMenu topBarHeight={topBarHeight} />

    </>
  )
}

export default OrdersScreenTopBar