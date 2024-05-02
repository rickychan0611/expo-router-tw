import { StyleSheet, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { usePokemonDetail, usePokemonList } from "@/src/hooks/usePokemon";
import { useEffect } from "react";
import tw from "@/tw";

const Details = () => {
  const { user } = useLocalSearchParams();
  const client = useQueryClient();
  const { data } = usePokemonDetail(3);

  useEffect(() => {
    console.log(tw.memoBuster)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Details</Text>
        <Text style={styles.user}> {JSON.stringify(data)}</Text>
        <View>
          {/* {data?.results ? data.results.map((item: any) => (
            <Text key={item.name}>{item.name}</Text>
          )) : <Text>No data</Text>} */}
        </View>
      </View>
    </View>
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
  user: {
    fontSize: 24,
    color: "#38434D",
    marginTop: 16,
  },
  linkButton: {
    fontSize: 24,
    color: "#1B95E0",
    marginTop: 16,
  },
});

export default Details;
