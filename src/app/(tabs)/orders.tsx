import tw from "@/tw";
import { Text, View, StyleSheet, Pressable, StatusBar, ScrollView, Animated } from "react-native";
import { useAppColorScheme } from "twrnc";
import React, { useEffect } from "react";
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


const TopBar = () => {
  const [t, i18n] = useTranslation("common")
  const [isShowing, setIsShowing] = React.useState(false)
  const [opacity, setOpacity] = React.useState(new Animated.Value(0))
  const [translateY, setTranslateY] = React.useState(new Animated.Value(-100))

  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content')
  })

  return (
    <>
      <AppBarContainer>
        <View style={tw`flex-1 w-full`}>
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
            <PressableOpacity onPress={() => { }}>
              <ListFilter style={tw`text-white`} />
            </PressableOpacity>
          </RowBetween>
        </View>
      </AppBarContainer >
      <View style={tw`h-3 bg-primary dark:bg-primary-dark`} />
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
          <Card style={tw`mt-2`}>
            <RowBetween style={tw`items-start`}>
              <Subhead>id number</Subhead>
              <View style={tw`justify-end`}>
                <Small style={tw`text-muted text-right`}>12:59 am</Small>
                <Interact style={tw`text-success text-right`}>
                  Delivered
                </Interact>
              </View>
            </RowBetween>
            <Divider style={tw`my-2`} />
            <RowBetween>
              <P1 style={tw`text-primary-600 dark:text-primary-dark-600`}>
                {23} items
              </P1>
              <P1 style={tw`text-neutral-900 dark:text-neutral-dark-900`}>
                $12,00
              </P1>
            </RowBetween>
            <Row style={tw`mt-2 gap-2`}>
              <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
              <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
              <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
              <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
              <View style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}></View>
              <Center style={tw`flex-1 bg-neutral-200 h-[52px] max-w-[52px] rounded`}>
                <MoreHorizontal color={colors.neutral[900]} />
              </Center>
            </Row>


          </Card>
        </Container>
      </ScrollView>
    </View>
  );
}

export default Orders;
