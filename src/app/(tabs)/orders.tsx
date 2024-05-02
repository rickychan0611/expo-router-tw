import tw from "@/tw";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useAppColorScheme } from "twrnc";
import { useEffect } from "react";
import { useAppStore } from "@/stores";
import useColorScheme from "@/hooks/useColorScheme";

const Index = () => {
  
  const { switchTheme } = useColorScheme();

  return (
    <View style={tw`flex-1 bg-primary-100 dark:bg-muted`}>
      <View style={tw`p-4`}>
        <Pressable onPress={() => {
          switchTheme()
        }}>
          {<Text style={tw`text-primary-500 dark:text-secondary-foreground`}>sdfsdfsdfsd</Text>}
        </Pressable>
      </View>
    </View>
  );
}

export default Index;
