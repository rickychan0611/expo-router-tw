import tw from "@/tw";
import { Text, View, StatusBar, ScrollView, FlatList, SectionList } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/stores";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "expo-router";
import AppBarContainer from "@/components/AppBarContainer";
import { H4, Interact, } from "@/components/Typography";
import Container from "@/components/Container";
import TextInput from "@/components/TextInput";
import { Row, RowBetween } from "@/components/FlexViews";
import { ListFilter, Search } from "lucide-react-native";
import PressableOpacity from "@/components/PressableOpacity";
import { colors } from "@/colors";
import SlideDownMenu from "@/components/SlideDownMenu";
import OrderCard from "@/components/OrderCard";
import { useOrders } from "@/api/queryHooks/useProductQueries";
import { Order, useGetOrderListTypes } from "@/interfaces/productTypes";
import { useScreenSize } from "@/hooks/useScreenSize";
import moment from "moment";


const TopBar = () => {
  const [t, i18n] = useTranslation("common")
  const [topBarHeight, setTopBarHeight] = useState(0);
  const openFilterMenu = useAppStore((state) => state.openFilterMenu)
  const setOpenFilterMenu = useAppStore((state) => state.setOpenFilterMenu)

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
  const screen = useScreenSize()

  // fetch data
  const [params, setParams] = useState<useGetOrderListTypes>({
    status: "all",
    page: 1,
    pagesize: 10
  })
  const orders = useOrders(params)

  type SectionListData = {
    title: string
    data: Order[]
  }[]

  const [sectionData, setSectionData] = useState<any>([])

  const convertSectionData = (data: Order[]) => {
    return data.reduce((result, order) => {
      const title = moment(order.place_time).startOf('day').format('YYYY-MM-DD')
      const existing = result.find(item => item.title === title)
      if (existing) {
        existing.data.push(order)
      } else {
        result.push({
          title,
          data: [order]
        })
      }
      return result
    }, [] as SectionListData)
  }


  useEffect(() => {
    if (orders.data) {
      const newData: SectionListData = convertSectionData(orders.data)
      setSectionData(newData)
    }
  }, [orders.data])

  const renderListItem = ({ item }: { item: Order }) => {
    return (
      <OrderCard item={item} />
    )
  }

  const renderSection = ({ index, item, section }: { index: number, item: Order, section: any }) => {

    return (
      index === 0
        ? <FlatList
          data={section.data}
          numColumns={
            screen === "xs" ? 1 :
              screen === "sm" ? 2 :
                screen === "md" ? 2 :
                  screen === "lg" ? 3 : 3}
          renderItem={renderListItem}
          keyExtractor={(item) => item.order_id}
        />
        : null
    )
  }

  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark`}>
      <TopBar />
      <ScrollView>
        <Container>
          <View style={[tw`flex-row flex-wrap m-[-8px]`]}>
            <SectionList
              sections={sectionData}
              keyExtractor={(item, index) => item.id + index + ""}
              renderItem={renderSection}
              renderSectionHeader={({ section: { title } }) => (
                <View style={tw`px-2 py-1 mt-4`}>
                  <Text style={tw`text-sm font-bold text-neutral-600 dark:text-neutral-dark-600`}>
                    {title}
                  </Text>
                </View>
              )}
            />
          </View>
        </Container>
      </ScrollView>
    </View>
  );
}

export default Orders;
