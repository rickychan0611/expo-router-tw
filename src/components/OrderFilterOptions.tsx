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

type Props = {
}

const OrderFilterOptions = () => {
  const orderFilter = useAppStore((state) => state.orderFilter)
  const setOrderFilter = useAppStore((state) => state.setOrderFilter)

  return (
    <View style={tw`items-center justify-center w-full`}>
      <View style={tw`w-full max-w-2xl bg-card dark:bg-card-dark p-4 pb-6 rounded-b-m`}>
        <RowBetween>
          <H5 style={tw`text-neutral-900 dark:text-neutral-dark-900`}>
            Filter
          </H5>
          <PressableOpacity onPress={() => { setOrderFilter(undefined) }}>
            <Interact style={tw`text-muted dark:text-muted-dark`}>
              Reset
            </Interact>
          </PressableOpacity>
        </RowBetween>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Row style={tw`mt-2 gap-2`}>
            <Button
              color={orderFilter === "New" ? colors.primary[300] : colors.neutral[100]}
              darkColor={orderFilter === "New" ? colors.primary.dark.DEFAULT : colors.neutral[800]}
              onPress={() => setOrderFilter("New")}
            >
              New
            </Button>
            <Button
              color={orderFilter === "Delivering" ? colors.primary[300] : colors.neutral[100]}
              darkColor={orderFilter === "Delivering" ? colors.primary.dark.DEFAULT : colors.neutral[800]}
              onPress={() => setOrderFilter("Delivering")}
            >
              Delivering
            </Button>
            <Button
              color={orderFilter === "Delivered" ? colors.primary[300] : colors.neutral[100]}
              darkColor={orderFilter === "Delivered" ? colors.primary.dark.DEFAULT : colors.neutral[800]}
              onPress={() => setOrderFilter("Delivered")}
            >
              Delivered
            </Button>
            <Button
              color={orderFilter === "Cancelled" ? colors.primary[300] : colors.neutral[100]}
              darkColor={orderFilter === "Cancelled" ? colors.primary.dark.DEFAULT : colors.neutral[800]}
              onPress={() => setOrderFilter("Cancelled")}
            >
              Cancelled
            </Button>
          </Row>
        </ScrollView >
        <Divider style={tw`my-4`} />
        <H5>
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
      </View>
    </View >
  )
}

export default OrderFilterOptions