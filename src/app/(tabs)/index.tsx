import tw from "@/tw";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useAppColorScheme } from "twrnc";
import { useEffect } from "react";
import { useAppStore } from "@/stores";
import useColorScheme from "@/hooks/useColorScheme";
import { H1, H2, H3 } from "@/components/Typography";

const Index = () => {

  const { switchTheme } = useColorScheme();

  return (
    <View style={tw`flex-1 bg-primary-100 dark:bg-muted`}>
      <View style={tw`p-4`}>
        <Pressable onPress={() => {
          switchTheme()
        }}>
          {<H1 style={tw`text-red-500`}>sdfsdfsdfsd</H1>}
          {<H2>sdfsdfsdfsd</H2>}
          {<H3>sdfsdfsdfsd</H3>}
        </Pressable>
      </View>
    </View>
  );
}

export default Index;
