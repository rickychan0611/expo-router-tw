import tw from "@/tw";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useAppColorScheme } from "twrnc";
import { useEffect } from "react";
import { useAppStore } from "@/stores";
import useColorScheme from "@/hooks/useColorScheme";
import { H1, H2, H3 } from "@/components/Typography";
import Button from "@/components/Button";

const Index = () => {

  const { switchTheme } = useColorScheme();

  return (
    <View style={tw`flex-1 p-4 bg-background dark:bg-background-dark`}>
      <Pressable onPress={() => {
        switchTheme()
      }}>
        {<H1 style={tw`text-red-500`}>sdfsdfsdfsd</H1>}
        {<H2>sdfsdfsdfsd</H2>}
        {<H3>sdfsdfsdfsd</H3>}
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button icon="Home">Button</Button>
        <Button icon="Home" circle>Button</Button>
        <Button variant="outline">Button</Button>
      </Pressable>
    </View>
  );
}

export default Index;
