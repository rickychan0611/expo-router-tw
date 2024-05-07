import tw from "@/tw";
import { Text, View, StatusBar, FlatList, SectionList, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/stores";
import OrderCard from "@/components/OrderCard";
import { useInfiniteQueryOrders, useOrders } from "@/api/queryHooks/useProductQueries";
import { Order } from "@/interfaces/productTypes";
import { useScreenSize } from "@/hooks/useScreenSize";
import moment from "moment";
import OrdersScreenTopBar from "@/components/OrdersScreenTopBar";

type SectionListData = {
  title: string
  data: Order[]
}[]

const Orders = () => {
  const screen = useScreenSize()
  const topBarHeight = useAppStore((state) => state.topBarHeight)
  const tabBarHeight = useAppStore((state) => state.tabBarHeight)
  const [listHeight, setListHeight] = useState(0)
  const { height } = useWindowDimensions();
  const orderListData = useAppStore((state) => state.orderListData)
  const setOrderListData = useAppStore((state) => state.setOrderListData)

  // fetch data
  // const orders = useOrders()
  const orders = useInfiniteQueryOrders()

  const convertSectionData = async (data: Order[]): Promise<SectionListData> => {
    const sectionListData: SectionListData = []
    if (data) {
      for (const order of data) {
        const title = moment(order.place_time).startOf('day').format('YYYY-MM-DD')
        const existing = sectionListData.find(item => item.title === title)
        if (existing) {
          existing.data.push(order)
        } else {
          sectionListData.push({
            title,
            data: [order]
          })
        }
      }
    }
    return Promise.resolve(sectionListData)
  }

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

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View style={tw`px-2 py-1 mt-4`}>
      <Text style={tw`text-sm font-bold text-neutral-600 dark:text-neutral-dark-600`}>
        {title}
      </Text>
    </View>
  )

  useEffect(() => {
    setListHeight(height - (topBarHeight + tabBarHeight) + (StatusBar.currentHeight || 0))
  }, [topBarHeight, tabBarHeight, height])


  useEffect(() => {
    (async () => {
      console.log("cccccccc", orders)
      console.log("ccccccxxxxxxcc", orders?.data?.pages)
      if (orders?.data?.pages?.length) {
        const allOrders = orders.data?.pages.flatMap(page => page.data) ?? [];
        console.log("allOrders", allOrders)
        // const newData: SectionListData | undefined = await convertSectionData(allOrders)
        // setOrderListData(newData)
      }
      else setOrderListData([])
    })()
  }, [orders?.data?.pages])

  // useEffect(() => {
  //   setOrderListData([])
  // }, [])

  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark`}>
      <OrdersScreenTopBar />

      {/* set setionlist container height for scrolling */}
      <View style={[tw`w-full bg-background dark:bg-background-dark`, { height: listHeight }]}>
        <TouchableOpacity onPress={() => orders.fetchNextPage()}>
          <Text style={tw`text-white`}>{"fetchNextPage"}</Text>
        </TouchableOpacity>
        <Text style={tw`text-white`}>{JSON.stringify(orders?.isFetching)}</Text>
        <Text style={tw`text-white`}>{JSON.stringify(orders?.isLoading)}</Text>
        <Text style={tw`text-white`}>{JSON.stringify(orders?.error)}</Text>
        <SectionList
          initialNumToRender={50}
          contentContainerStyle={tw`pb-10 w-full max-w-6xl mx-auto`}
          stickySectionHeadersEnabled={false}
          sections={orderListData || []}
          keyExtractor={(item, index) => item.id + index + ""}
          renderItem={renderSection}
          renderSectionHeader={renderSectionHeader}
          onEndReached={() => {
          }}
        />

      </View>
    </View>
  );
}

export default Orders;
