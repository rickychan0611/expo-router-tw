import tw from "@/tw";
import { Text, View, StatusBar, FlatList, SectionList, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/stores";
import OrderCard from "@/components/OrderCard";
import { useOrders } from "@/api/queryHooks/useProductQueries";
import { Order, useGetOrderListTypes } from "@/interfaces/productTypes";
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
  const [sectionData, setSectionData] = useState<any>([])
  
  // fetch data
  const [queryParams, setQueryParams] = useState<useGetOrderListTypes>({
    status: "all",
    page: 1,
    pagesize: 10
  })

  const orders = useOrders(queryParams)

  const convertSectionData = (data: Order[]) => {
    if (data?.length) {
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
    if (orders?.data?.length && topBarHeight && tabBarHeight) {
      const newData: SectionListData | undefined = convertSectionData(orders.data)
      setSectionData(newData)
    }
  }, [orders.data, topBarHeight, tabBarHeight])

  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark`}>
      <OrdersScreenTopBar setQueryParams={setQueryParams}/>
      <View style={[tw`w-full items-center bg-background dark:bg-background-dark `]}>

        {/* set setionlist container height for scrolling */}
        <View style={[tw`w-full max-w-6xl`, { height: listHeight }]}>
          <SectionList
            contentContainerStyle={tw`pb-10`}
            stickySectionHeadersEnabled={false}
            sections={sectionData}
            keyExtractor={(item, index) => item.id + index + ""}
            renderItem={renderSection}
            renderSectionHeader={renderSectionHeader}
          />
        </View>

      </View>
    </View>
  );
}

export default Orders;
