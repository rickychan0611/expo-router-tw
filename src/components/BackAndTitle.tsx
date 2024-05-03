import { View, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import tw from "twrnc"
import { H4, P } from "./Typography";
import { ArrowLeft } from "@/components/Icons"
import { Row } from "./FlexViews";

type Props = { name?: string, goBack?: any, bg?: string }

export default function BackAndTitle({ name, goBack, bg }: Props) {

  return (
    <>
      {/* <Button
        variant={"ghost"}
        onPress={() => goBack ? router.push(goBack) : router.back()}>
        <Row>
          <ArrowLeft size={24} className="text-foreground" />
          {name && <Text className="ml-2 text-foreground">{name}</Text>}
        </Row>
      </Button> */}
    </>
  )
}