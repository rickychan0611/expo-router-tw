import tw from "@/tw";
import { Text, View, StatusBar, FlatList, SectionList, useWindowDimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";
import { useInfiniteQueryOrders, useOrders } from "@/api/queryHooks/useProductQueries";
import { Order } from "@/interfaces/productTypes";
import { useScreenSize } from "@/hooks/useScreenSize";
import moment from "moment";
import OrdersScreenTopBar from "@/components/OrdersScreenTopBar";
import { useOrdersStore } from "@/stores/useOrdersStore";
import { useAppStore } from "@/stores";
import { colors } from "@/colors";

type SectionListData = {
  title: string
  data: Order[]
}[]

const Orders = () => {
  const screen = useScreenSize()
  const [listHeight, setListHeight] = useState(0)
  const { height } = useWindowDimensions();

  const tabBarHeight = useAppStore((state) => state.tabBarHeight)
  const topBarHeight = useOrdersStore((state) => state.topBarHeight)
  const orderSectionData = useOrdersStore((state) => state.orderSectionData)
  const setOrderSectionData = useOrdersStore((state) => state.setOrderSectionData)

  // fetch data
  // const orders = useOrders()
  const orders = useInfiniteQueryOrders()

  // Define the convertSectionData function
  const convertSectionData = async (data: Order[]) => {
    const sectionListData = [];
    if (data) {
      for (const order of data) {
        const title = moment(order.place_time).startOf('day').format('YYYY-MM-DD');
        const existingIndex = sectionListData.findIndex((item) => item.title === title);
        if (existingIndex !== -1) {
          sectionListData[existingIndex].data.push(order);
        } else {
          sectionListData.push({
            title,
            data: [order],
          });
        }
      }
    }
    return Promise.resolve(sectionListData);
  };

  useEffect(() => {
    (async () => {
      if (!orders?.pages?.length) return
      const ordersArray: any = orders.pages
      const flatmapped = ordersArray.flatMap((page: any) => page.data)
      const newSections = await convertSectionData(flatmapped);
      setOrderSectionData(newSections)
    })()
  }, [orders.pages])

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

  const renderFooter = () => {
    return (
      <View style={tw`mt-4`}>
        {orders?.isFetchingNextPage && <ActivityIndicator color={colors.primary[500]} />}
      </View>
    )
  }

  useEffect(() => {
    setListHeight(height - (topBarHeight + tabBarHeight) + (StatusBar.currentHeight || 0))
  }, [topBarHeight, tabBarHeight, height])



  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark`}>
      <OrdersScreenTopBar />

      {/* set setionlist container height for scrolling */}
      <View style={[tw`w-full bg-background dark:bg-background-dark`, { height: listHeight }]}>
        <SectionList
          initialNumToRender={50}
          contentContainerStyle={tw`pb-10 w-full max-w-6xl mx-auto`}
          stickySectionHeadersEnabled={false}
          sections={orderSectionData || []}
          keyExtractor={(item, index) => item.id + index + ""}
          renderItem={renderSection}
          renderSectionHeader={renderSectionHeader}
          onEndReached={() => orders.fetchNextPage()}
          ListFooterComponent={renderFooter}
          onRefresh={() => orders.refetch()}
          refreshing={orders.isFetching}
        />

      </View>
    </View>
  );
}

export default Orders;
