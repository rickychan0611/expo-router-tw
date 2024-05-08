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
  runOnJS,
} from 'react-native-reanimated';
import tw from '@/tw';
import { Dimensions, Pressable } from 'react-native';
import { useOrdersStore } from '@/stores';
import { BlurView } from 'expo-blur';

type Props = {
  setOpen?: any
  open: boolean
}

const BackDrop = ({ setOpen, open }: Props) => {
  const openFilterMenu = useOrdersStore((state) => state.openFilterMenu)

  const screenHeight = Dimensions.get('window').height;
  const [disabled, setDisabled] = useState(false);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-screenHeight || -1000);

  const timeout = () => {
    translateY.value = -screenHeight
    setDisabled(false)
  }

  useEffect(() => {
    let timeoutId: any
    if (openFilterMenu === false) {
      console.log("openFilterMenu false")
      setDisabled(true)
      opacity.value = 0
      timeoutId = setTimeout(() => runOnJS(timeout)(), 300)
    }
    else if (openFilterMenu === true) {
      console.log("openFilterMenu true")
      translateY.value = 0
      opacity.value = .8
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [openFilterMenu])

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, {
      duration: 300,
      dampingRatio: 1,
      stiffness: 1,
    }),
    transform: [{
      translateY: withSpring(translateY.value, {
        duration: 1,
        dampingRatio: 1,
        stiffness: 1,
      }),
    }],
  }));

  return (
    <Animated.View style={[tw`bg-neutral-900 dark:bg-black flex-1 absolute w-full h-screen z-48`, backdropStyle]}>
      <Pressable onPress={() => setOpen(false)} style={tw`w-full h-full`} disabled={disabled}>
      </Pressable>
    </Animated.View >
  )
}

export default BackDrop

