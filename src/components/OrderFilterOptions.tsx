import tw from "@/tw";
import { Text, View, StyleSheet, Pressable, StatusBar, ScrollView, Animated, Dimensions } from "react-native";
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
import { useOrders } from "@/api/queryHooks/useProductQueries";
import { OrderFilterQueryParams } from "@/interfaces/productTypes";

type Props = {
}

const OrderFilterOptions = () => {
  const orderFilter = useAppStore((state) => state.orderFilter)
  const setOrderFilter = useAppStore((state) => state.setOrderFilter)
  const setOpenFilterMenu = useAppStore((state) => state.setOpenFilterMenu)
  const screenWidth = Dimensions.get('window').width

  const orderFilterQueryParams = useAppStore((state) => state.orderFilterQueryParams)
  const setOrderFilterQueryParams = useAppStore((state) => state.setOrderFilterQueryParams)

  const handleApplyFilter = () => {
    const temp: OrderFilterQueryParams = { ...orderFilterQueryParams }
    temp.status = orderFilter
    setOrderFilterQueryParams(temp)
    setOpenFilterMenu(false)
  }


  return (
    <View style={tw`bg-card dark:bg-card-dark p-4 pb-6 rounded-b-m w-[${screenWidth}px] max-w-[500px]`}>
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
        <TextInput style={tw`flex-1 bg-background rounded text-black placeholder:text-muted`}
          placeholder="Search Order" />
      </Row>
      <Row style={tw`mt-4 gap-4`}>
        <Interact style={tw`text-primary-800 dark:text-primary-dark-800 w-15`}>
          To
        </Interact>
        <TextInput style={tw`flex-1 bg-background rounded text-black placeholder:text-muted`}
          placeholder="Search Order" />
      </Row>
      <Button style={tw`mt-8`}
        onPress={handleApplyFilter}>
        Apply
      </Button>
    </View>
  )
}

export default OrderFilterOptions