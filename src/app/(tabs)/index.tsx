import * as React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { H3, H5, Interact, P, Subtle } from '@/components/Typography';
import { useGetUserInfo } from '@/api/queryHooks/useUserQueries';
import Button from '@/components/Button';
import { ColCenter, RowBetween } from '@/components/FlexViews';
import AppBarContainer from '@/components/AppBarContainer';
import PressableOpacity from '@/components/PressableOpacity';
import Divider from '@/components/Divider';
import Card from '@/components/Card';
import tw from "@/tw";
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from 'expo-router';

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
        <Button icon="Store" circle />
      </AppBarContainer >
      <View style={tw`h-3 bg-primary dark:bg-primary-dark rounded-b-full`} />
    </>
  )
}

export default function Home() {
  const userInfo = useGetUserInfo()

  return (
    <View style={tw`flex-1 bg-background dark:bg-background-dark`}>
      <TopBar />
      <ScrollView >
        <View style={tw`px-2`}>
          <Card style={tw`mt-sm`}>
            <RowBetween>
              <H5>Today's </H5>
              <PressableOpacity>
                <Interact style={tw`text-muted`}>All orders</Interact>
              </PressableOpacity>
            </RowBetween>
            <Divider style={tw`my-sm`} />

            <RowBetween style={tw`flex-1 gap-4 w-full`}>

              <ColCenter style={tw`flex-1 h-full`}>
                <Subtle style={tw`text-primary-600 dark:text-primary-200 w-full text-center`}>
                  Pending
                </Subtle>
                <ColCenter style={tw`bg-primary-200 dark:bg-primary-200 rounded p-sm mt-sm w-full`}>
                  <P style={tw`text-primary-600 dark:text-primary-dark-600`}>
                    1
                  </P>
                </ColCenter>
              </ColCenter>

              <ColCenter style={tw`flex-1 h-full`}>
                <Subtle style={tw`text-neutral-900 w-full text-center`}>Delivering</Subtle>
                <ColCenter style={tw`bg-neutral-50 rounded p-sm mt-sm w-full`}>
                  <P style={tw`text-primary-600`}>
                    12
                  </P>
                </ColCenter>
              </ColCenter>

              <ColCenter style={tw`flex-1 h-full`}>
                <Subtle style={tw`text-primary-900 w-full text-center`}>
                  Finished
                </Subtle>
                <ColCenter style={tw`bg-neutral-50 rounded p-sm mt-sm w-full`}>
                  <P style={tw`text-primary-600`}>
                    1
                  </P>
                </ColCenter>
              </ColCenter>

            </RowBetween>
          </Card>

          <Card style={tw`mt-sm`}>
            <RowBetween>
              <H5>
                Settlements
              </H5>
              <PressableOpacity>
                <Interact style={tw`text-muted`}>
                  Details
                </Interact>
              </PressableOpacity>
            </RowBetween>
            <Divider style={tw`my-sm`} />
            <Divider style={tw`my-sm`} />
          </Card>

        </View>
      </ScrollView>
    </View>
  );
}

