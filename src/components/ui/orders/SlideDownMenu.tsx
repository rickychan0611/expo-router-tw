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
  runOnJS,
} from 'react-native-reanimated';
import tw from '@/tw';
import { useOrdersStore } from '@/stores';
import BackDrop from '../../BackDrop';
import { Dimensions, View } from 'react-native';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = {
  topBarHeight?: number
}
const SlideDownMenu = ({ topBarHeight }: Props) => {

  const openFilterMenu = useOrdersStore((state) => state.openFilterMenu)
  const setOpenFilterMenu = useOrdersStore((state) => state.setOpenFilterMenu)
  const [menuSize, setMenuSize] = useState({ height: 0, width: 0 });
  const [translateX, setTranslateX] = useState(0)
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const translateY = useSharedValue(-1000);

  const updateScreenSize = () => {
    setScreenWidth(Dimensions.get('window').width);
    setScreenHeight(Dimensions.get('window').height);
  };
  // slide down the menu
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: withTiming(translateY.value, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      })
    }],
  }));

  // get the height of the menu
  const onLayout = (event: any) => {
    const { height, width } = event.nativeEvent.layout;
    setMenuSize({ height, width });
  };

  // open the menu
  useEffect(() => {
    if (openFilterMenu) {
      translateY.value = 0
    }
    if (!openFilterMenu && menuSize.height > 0) {
      translateY.value = -menuSize.height
    }
  }, [openFilterMenu, menuSize.height])

  // center the menu
  useEffect(() => {
    setTranslateX((screenWidth / 2) - (menuSize.width / 2))
  }, [screenWidth, menuSize.width])

  useEffect(() => {
    const onChange = () => {
      updateScreenSize();
    };
    Dimensions.addEventListener('change', onChange);
  }, []);

  const onClose = () => {
    setOpenFilterMenu(false)
  }

  const fling = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      runOnJS(onClose)()
    })


  return (
    <>
      <BackDrop open={openFilterMenu} setOpen={setOpenFilterMenu} />
      <Animated.View style={[tw`absolute z-49 left-[${translateX}px] top-[${topBarHeight || 0}px]`, animatedStyle]}
        onLayout={onLayout}>
        <OrderFilterOptions menuSize={menuSize} />
      </Animated.View>
    </>
  )
}

export default SlideDownMenu