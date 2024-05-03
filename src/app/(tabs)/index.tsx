import * as React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { H3, H5, Interact, P1, Subtle } from '@/components/Typography';
import { useGetUserInfo } from '@/api/queryHooks/useUserQueries';
import Button from '@/components/Button';
import { Center, ColCenter, RowBetween } from '@/components/FlexViews';
import AppBarContainer from '@/components/AppBarContainer';
import PressableOpacity from '@/components/PressableOpacity';
import Divider from '@/components/Divider';
import Card from '@/components/Card';
import tw from "@/tw";
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from 'expo-router';
import Container from '@/components/Container';
import { colors } from '@/colors';
import { useAppStore } from '@/stores';
import moment from 'moment';

const TopBar = () => {
  const [t, i18n] = useTranslation("common")

  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content')
  })

  return (
    <>
      <AppBarContainer>
        <View style={tw`flex-1 py-sm`}>
          <H3
            style={tw`text-white`}
            numberOfLines={1}
          >
            {t`Continue`} {i18n.language}
          </H3>
        </View>
        <Button icon="Store" circle color='#B14141' />
      </AppBarContainer >
      <View style={tw`h-3 bg-primary dark:bg-primary-dark rounded-b-full`} />
    </>
  )
}


export default function Home() {
  const userInfo = useGetUserInfo()
  const statsFilter = useAppStore(state => state.statsFilter)
  const setStatsFilter = useAppStore(state => state.setStatsFilter)

  type StatsDay = {
    name: "Yesterday" | "Last 7 days" | "Last 30 days" | "This month" | "This year" | "All time"
    startTime: number;
    endTime: number;
  }

  const statsDays: StatsDay[] = [
    {
      name: "Yesterday",
      startTime: moment().subtract(1, "days").unix(),
      endTime: moment().unix()
    },
    {
      name: "Last 7 days",
      startTime: moment().subtract(7, "days").unix(),
      endTime: moment().unix()
    },
    {
      name: "Last 30 days",
      startTime: moment().subtract(30, "days").unix(),
      endTime: moment().unix()
    },
    {
      name: "This month",
      startTime: moment().startOf("month").unix(),
      endTime: moment().endOf("month").unix()
    },
    {
      name: "This year",
      startTime: moment().startOf("year").unix(),
      endTime: moment().endOf("year").unix()
    },
    {
      name: "All time",
      startTime: 0,
      endTime: moment().unix()
    }
  ]


  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark`}>
      <TopBar />
      <ScrollView >
        <Container>
          <Card style={tw`mt-2`}>
            <RowBetween>
              <H5>Today's </H5>
              <PressableOpacity>
                <Interact style={tw`text-muted`}>All orders</Interact>
              </PressableOpacity>
            </RowBetween>
            <Divider style={tw`my-4`} />

            <RowBetween style={tw`gap-4 w-full `}>

              <ColCenter style={tw`flex-1 h-20`}>
                <Subtle style={tw`text-primary-600 dark:text-primary-200 w-full text-center`}>
                  Pending
                </Subtle>
                <ColCenter style={tw`bg-primary-100 dark:bg-neutral-1000 rounded mt-sm w-full h-12`}>
                  <P1 style={tw`text-primary-600 dark:text-primary-300`}>
                    1
                  </P1>
                </ColCenter>
              </ColCenter>

              <ColCenter style={tw`flex-1 h-20`}>
                <Subtle style={tw`text-black dark:text-white w-full text-center`}>
                  Delivering
                </Subtle>
                <ColCenter style={tw`bg-primary-100 dark:bg-neutral-1000 rounded mt-sm w-full h-12`}>
                  <P1 style={tw`text-primary-600 dark:text-primary-300`}>
                    1
                  </P1>
                </ColCenter>
              </ColCenter>

              <ColCenter style={tw`flex-1 h-20`}>
                <Subtle style={tw`text-black dark:text-white w-full text-center`}>
                  Finished
                </Subtle>
                <ColCenter style={tw`bg-primary-100 dark:bg-neutral-1000 rounded mt-sm w-full h-12`}>
                  <P1 style={tw`text-primary-600 dark:text-primary-300`}>
                    1
                  </P1>
                </ColCenter>
              </ColCenter>

            </RowBetween>
          </Card>

          <Card style={tw`mt-4`}>
            <RowBetween>
              <H5>
                Your shop stats
              </H5>
              <PressableOpacity>
                <Interact style={tw`text-muted`}>
                  Details
                </Interact>
              </PressableOpacity>
            </RowBetween>
            <Divider style={tw`my-4`} />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`py-2 `}>
              <RowBetween style={tw`gap-3 w-full `}>
                {statsDays.map((day: StatsDay) => (
                  <Button
                    key={day.name}
                    style={tw`rounded-full`}
                    full
                    color={statsFilter === day.name ? colors.primary[300] : colors.neutral[100]}
                    darkColor={statsFilter === day.name ? colors.primary.dark.DEFAULT : colors.neutral[800]}
                    onPress={() => setStatsFilter(day.name)}
                  >
                    {day.name}
                  </Button>
                ))}
              </RowBetween>
            </ScrollView>

            <RowBetween style={tw`gap-4 w-full my-4`}>
              <ColCenter style={tw`flex-1 border border-neutral-100 dark:border-muted-dark rounded p-2`}>
                <Subtle>Total Orders</Subtle>
                <P1 style={tw`text-muted dark:text-muted mt-2`}>21</P1>
              </ColCenter>
              <ColCenter style={tw`flex-1 border border-neutral-100 dark:border-muted-dark rounded p-2`}>
                <Subtle>Revenue</Subtle>
                <P1 style={tw`text-muted dark:text-muted mt-2`}>
                  $12334.45
                </P1>
              </ColCenter>
            </RowBetween>

            <View style={tw`w-full my-4 border border-neutral-100 dark:border-muted-dark rounded p-4`}>
              <Subtle>Monthly Revenue Graph</Subtle>
              <View style={tw`w-full border border-neutral-100 dark:border-muted-dark rounded p-4 mt-4`}>
                <Subtle>Monthly Revenue Graph</Subtle>
                <Subtle>Monthly Revenue Graph</Subtle>
              </View>
            </View>
          </Card>
        </Container>
      </ScrollView>
    </View>
  );
}

