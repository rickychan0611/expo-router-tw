import tw from "@/tw";
import { Text, View, StyleSheet, Pressable, StatusBar, ScrollView, Animated } from "react-native";
import { useAppColorScheme } from "twrnc";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/stores";
import useColorScheme from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "expo-router";
import AppBarContainer from "@/components/AppBarContainer";
import { H3, H4, H5, Interact, P1, Small, Subhead } from "@/components/Typography";
import Button from "@/components/Button";
import Container from "@/components/Container";
import TextInput from "@/components/TextInput";
import Card from "@/components/Card";
import { Center, ColCenter, Row, RowBetween } from "@/components/FlexViews";
import { ListFilter, MoreHorizontal, Search } from "lucide-react-native";
import PressableOpacity from "@/components/PressableOpacity";
import { colors } from "@/colors";
import Divider from "@/components/Divider";
import SlideDownMenu from "@/components/SlideDownMenu";
import OrderCard from "@/components/OrderCard";


const TopBar = () => {
  const [t, i18n] = useTranslation("common")
  const orderFilter = useAppStore((state) => state.orderFilter)
  const setOrderFilter = useAppStore((state) => state.setOrderFilter)
  const [topBarHeight, setTopBarHeight] = useState(0);
  const openFilterMenu = useAppStore((state) => state.openFilterMenu)
  const setOpenFilterMenu = useAppStore((state) => state.setOpenFilterMenu)

  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content')
  })

  // Get the height of the TopBar
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    console.log(height)
    setTopBarHeight(height);
  };

  return (
    <>
      <View style={tw`z-50`} onLayout={onLayout}>
        <AppBarContainer>
          <View style={tw`flex-1`}>
            <H4 style={tw`text-white text-center`}>
              All orders
            </H4>
            <RowBetween style={tw`mt-2 gap-2`}>
              <Row style={tw`bg-input sm:bg-background rounded flex-1`}>
                <View style={tw`pl-2`}>
                  <Search color={colors.muted.DEFAULT} />
                </View>
                <TextInput style={tw`flex-1`}
                  placeholder="Search Order"
                />
              </Row>
              <PressableOpacity onPress={() => { setOpenFilterMenu(!openFilterMenu) }}>
              <Text style={tw`text-white`}>{JSON.stringify(openFilterMenu)}</Text>
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

const Orders = () => {

  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark`}>
      <TopBar />
      <ScrollView>
        <Container>
          <Interact style={tw`mt-2 text-neutral-400 dark:text-neutral-dark-400`}>
            Today
          </Interact>
          <View style={tw`gap-2`}>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </View>
        </Container>
      </ScrollView>
    </View>
  );
}

export default Orders;
