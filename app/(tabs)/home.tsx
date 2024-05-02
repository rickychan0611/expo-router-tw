import { Text, View, StyleSheet, ScrollView, ScrollViewBase, useColorScheme } from "react-native";
import { usePokemonList } from "@/src/hooks/usePokemon";
import tw from "../../tw";
import { useEffect } from "react";

const Home = () => {
  const { data } = usePokemonList();
  useEffect(() => {
    console.log(tw.memoBuster)
  }, [])
  useColorScheme()
  return (
    <ScrollView >
      <View style={tw`flex-1 items-center justify-center dark:bg-primary-500`}>
        <Text style={tw`text-primary text-3xl`}>Home</Text>
        <View style={tw`flex-1 items-center justify-center dark:bg-primary-500`} key={tw.memoBuster}> 
          <Text style={tw` font-bold`}>Hello World</Text>
        </View>
        <Text style={styles.subtitle}>This is the Details page of your app.</Text>
        <View>
          {data?.results ? data.results.map((item: any) => (
            <Text key={item.name}>{item.name}</Text>
          )) : <Text>No data</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  linkButton: {
    fontSize: 24,
    color: "#1B95E0",
    marginTop: 16,
  },
});

export default Home;
