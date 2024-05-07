/**
 * Renders a backdrop component with animated styles based on the open state.
 *
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpen - Function to toggle the open state
 * @param {boolean} open - Boolean state indicating if the backdrop is open
 * @return {JSX.Element} Rendered backdrop component
 */

import React, { useEffect, useState } from 'react'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import tw from '@/tw';
import { Dimensions, Pressable } from 'react-native';
import { useOrdersStore } from '@/stores';
import { BlurView } from 'expo-blur';

type Props = {
  setOpen: any
  open: boolean
}

const BackDrop = ({ setOpen, open }: Props) => {
  const openFilterMenu = useOrdersStore((state) => state.openFilterMenu)

  const screenHeight = Dimensions.get('window').height;
  const [disabled, setDisabled] = useState(false);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-screenHeight);
  const timeout = () => {
    translateY.value = -screenHeight
    setDisabled(false)
  }

  useEffect(() => {

    let timeoutId: any
    if (!openFilterMenu) {
      setDisabled(true)
      opacity.value = 0
      timeoutId = setTimeout(() => timeout(), 100)
    }
    else {
      translateY.value = 0
      opacity.value = .6
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [openFilterMenu])

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, {
      duration: 100,
      dampingRatio: 1,
      stiffness: 1,
    }),
    transform: [{
      translateY: translateY.value
    }],
  }));

  return (
    <Animated.View style={[tw`bg-neutral-500 flex-1 absolute w-full h-screen z-48`, backdropStyle]}>
      <BlurView blurReductionFactor={50} experimentalBlurMethod={"dimezisBlurView"} tint="dark" intensity={50} style={tw`w-full h-full`} >
        <Pressable onPress={() => setOpen(!open)} style={tw`w-full h-full`} disabled={disabled}>
        </Pressable>
      </BlurView>
    </Animated.View >
  )
}

export default BackDrop