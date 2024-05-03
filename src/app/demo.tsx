import * as React from 'react';
import { ScrollView, View } from 'react-native';
import Container from '@/components/Container';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small } from '@/components/Typography';
import { useGetUserInfo } from '@/api/queryHooks/useUserQueries';
import Button from '@/components/Button';
import { Row } from '@/components/FlexViews';
import { ArrowLeft, Info } from '@/components/Icons';
import tw from '@/tw';
import AppBarContainer from '@/components/AppBarContainer';

const TopBar = () => {

  return (
    <>
      <AppBarContainer>
        <View style={tw`flex-1 py-sm`}>
          <H3
            style={tw`text-white`}
            numberOfLines={1}
          >
            hello
          </H3>
        </View>
        <Button icon="Store" circle />
      </AppBarContainer >
      <View style={tw`h-3 bg-primary dark:bg-primary-dark rounded-b-full`} />
    </>
  )
}

export default function Screen() {
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp."

  const userInfo = useGetUserInfo()

  return (
    <>
    <TopBar />
      <Container>
        <ArrowLeft size={24} color="text-foreground" />
        <ScrollView style={tw`p-4`}>
          <Row style={tw`gap-4 mb-4`}>
            <Button icon="Info" color="#292828">
              Primary
            </Button>
            <Button icon="Info" circle>
              Primary
            </Button>
            <Button variant='secondary'>
              Secondary
            </Button>
            <Button variant='outline'  icon="Home">
              outline
            </Button>
          </Row>
          <Row style={tw`gap-4 mb-4`}>
            <Button disabled>
              Primary
            </Button >
            <Button variant='secondary' disabled  icon="Info">
              Secondary
            </Button>
            <Button variant='outline' disabled   icon="Info" circle />
          </Row>
          <View style={tw`flex-col gap-4 pb-[100px] `}>
            <H1 style={tw``} >H1 Continue</H1>
            <H2>H2 Continue</H2>
            <H3>H3 Continue</H3>
            <H4>H4  Header 4</H4>
            <BlockQuote>BlockQuote - {text}</BlockQuote>
            <Code>Code - {text}</Code>
            <Large>Large - {text}</Large>
            <Lead>Lead - {text}</Lead>
            <Muted>Muted - {text}</Muted>
            <Small>Small - {JSON.stringify(userInfo.data || {})}</Small>
            <P style={tw`text-foreground leading-tight`}>P - {text}</P>
            <Button>
              <ThemeToggle />
            </Button>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}

