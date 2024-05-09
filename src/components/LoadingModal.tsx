import { View, Modal as RNModal, ActivityIndicator } from 'react-native';
import tw from "twrnc"

export default function LoadingModal({ loading }: any) {

  return (
    <RNModal
      transparent={true}
      visible={loading}
    >
      <View style={tw`w-full h-full bg-[rgba(0,0,0,0.5)] justify-center items-center`}>
        <View style={tw`bg-white rounded-lg`}>
          <View style={tw`bg-white rounded-lg h-[100px] w-[100px] flex justify-center items-center`}>
            <ActivityIndicator size="large" color={"red"} hidesWhenStopped={!loading} />
          </View>
        </View>
      </View>
    </RNModal>
  )
}