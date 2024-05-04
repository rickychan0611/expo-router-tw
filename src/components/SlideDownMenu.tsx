/**
 * Renders a slide-down menu with animation based on the top bar height.
 *
 * @param {number} props.topBarHeight - The height of the top bar.
 * @return {JSX.Element} The JSX element representing the slide-down menu.
 */
import React, { useEffect, useState } from 'react'
import OrderFilterOptions from './OrderFilterOptions'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import tw from '@/tw';
import { useAppStore } from '@/stores';
import BackDrop from './BackDrop';

type Props = {
  topBarHeight?: number
}
const SlideDownMenu = ({ topBarHeight }: Props) => {

  const openFilterMenu = useAppStore((state) => state.openFilterMenu)
  const setOpenFilterMenu = useAppStore((state) => state.setOpenFilterMenu)
  const [menuHeight, setMenuHeight] = useState(0);
  const translateY = useSharedValue(-300);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: withTiming(translateY.value, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      })
    }],
  }));

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setMenuHeight(height);
  };

  useEffect(() => {
    if (openFilterMenu) {
      translateY.value = 0
    }
    if (!openFilterMenu && menuHeight) {
      translateY.value = -menuHeight
    }
  }, [openFilterMenu])

  return (
    <>
      <BackDrop open={openFilterMenu} setOpen={setOpenFilterMenu} />
      <Animated.View style={[tw`top-[${topBarHeight || 0}px] absolute z-49 w-full`, animatedStyle]}
        onLayout={onLayout}>
        <OrderFilterOptions />
      </Animated.View>
    </>
  )
}

export default SlideDownMenu