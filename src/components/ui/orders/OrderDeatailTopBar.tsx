import React from "react";
import tw from "@/tw";
import { View, StatusBar } from "react-native";
import { useOrdersStore } from "@/stores";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import AppBarContainer from "@/components/AppBarContainer";
import { H4, Subtle } from "@/components/Typography";
import TextInput from "@/components/TextInput";
import { ColCenter, Row, RowBetween } from "@/components/FlexViews";
import { ArrowLeft, ChevronLeft, ListFilter, Search } from "lucide-react-native";
import PressableOpacity from "@/components/PressableOpacity";
import { colors } from "@/colors";
import SlideDownMenu from "@/components/ui/orders/SlideDownMenu";
import { OrderFilter } from "@/interfaces/productTypes";
import useTheme from "@/hooks/useTheme";

const OrderDeatailTopBar = () => {
  const [t, i18n] = useTranslation("common")
  const router = useRouter()
  const { isDarkColorScheme } = useTheme()
  const setTopBarHeight = useOrdersStore((state) => state.setTopBarHeight)
  const params = useLocalSearchParams()

  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content')
  })

  // Get the height of the TopBar
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setTopBarHeight(height);
  };


  return (
    <>
      <View style={tw`z-50`} onLayout={onLayout}>
        <AppBarContainer>
          <View style={tw`flex-1 max-w-6xl mx-auto`}>

            <ColCenter style={tw`absolute top-0 z-50 h-full`}>
              <PressableOpacity
                onPress={() => router.canGoBack() ? router.back() : router.push('/orders')}>
                <ArrowLeft size={26} color={isDarkColorScheme ? colors.white : colors.white} />
              </PressableOpacity>
            </ColCenter>

            <ColCenter>
              <H4 style={tw`text-white text-center`}>
                Order Details
              </H4>
              <Subtle style={tw`text-white`}>
                {params?.order_id}
              </Subtle>
            </ColCenter>

          </View>
        </AppBarContainer >
        <View style={tw`h-3 bg-primary dark:bg-primary-dark`} />
      </View>
    </>
  )
}

export default OrderDeatailTopBar