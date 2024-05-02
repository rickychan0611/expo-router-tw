import tw from "@/tw";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useAppColorScheme } from "twrnc";
import { useEffect } from "react";

const Index = () => {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

  return (
    <View style={tw`flex-1 bg-primary-100 dark:bg-muted`}>
      <View style={tw`p-4`}>
        <Pressable onPress={() => toggleColorScheme()}>
          {<Text style={tw`text-primary-500 dark:text-secondary-foreground`}>sdfsdfsdfsd</Text>}
        </Pressable>
      </View>
    </View>
  );
}

export default Index;
