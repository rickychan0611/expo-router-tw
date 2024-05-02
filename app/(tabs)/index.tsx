import { usePokemonDetail } from "@/src/hooks";
import tw from "@/tw";
import { QueryClient } from "@tanstack/query-core";
import { useQueryClient } from "@tanstack/react-query/build/legacy/QueryClientProvider";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useAppColorScheme } from "twrnc";
import { useEffect } from "react";

const Index = () => {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const queryClient = useQueryClient()
  
  const data = usePokemonDetail(3);
  useEffect(() => {
    console.log(tw.memoBuster)
  }, [])
  
  return (
    <View style={tw`flex-1 bg-primary-100 dark:bg-primary-500`}>
      <View style={tw`p-4`}>
        <Pressable onPress={() => toggleColorScheme()}>
          {<Text style={tw`text-primary-500 dark:text-primary-100`}>{JSON.stringify(data)}</Text>}
        </Pressable>
      </View>
    </View>
  );
}

export default Index;
