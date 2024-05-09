import React from 'react'
import { Interact } from './Typography'
import { Center, Row } from './FlexViews'
import PressableOpacity from './PressableOpacity'
import * as Icons from './Icons';
import tw from "@/tw";
import getContrastColor from '@/utils/getContrastColor';
import adjustBrightness from '@/utils/adjustBrightness';
import adjustColorBrightness from '@/utils/adjustBrightness';

type Props = {
  children?: React.ReactNode,
  variant?: "primary" | "secondary" | "outline",
  disabled?: boolean,
  onPress?: () => void,
  style?: any,
  icon?: keyof typeof Icons,
  circle?: boolean
  color?: string,
  darkColor?: string,
  full?: boolean,
}

const Button: React.FC<Props> = ({ children, variant, disabled, style, icon, circle, onPress, color, darkColor, full }, props) => {

  // default
  let bgClass = tw`bg-primary dark:bg-primary-dark`
  let textClass = tw`text-primary-foreground dark:text-primary-dark-foreground`
  const cirlceClass = circle ? tw`rounded-full p-[2px]` : tw`rounded py-1 px-m`

  //custom color
  if (color) {
    bgClass = tw`bg-[${color}] dark:bg-[${darkColor ? darkColor : adjustColorBrightness(color, 0.2)}]`
    textClass = tw`text-[${getContrastColor(color)}] dark:text-[${getContrastColor(darkColor + "")}]`
    if (disabled) {
      bgClass = tw`bg-${color}-200`
      textClass = tw`text-${color}-400`
    }
  }

  //disabled
  else if (!variant && disabled) {
    bgClass = tw`bg-primary-200 border border-primary-200`
    textClass = tw`text-primary-400`
  }
  else if (variant === "secondary" && disabled) {
    bgClass = tw`bg-secondary-300 border border-secondary-300`
    textClass = tw`text-secondary-400`
  }
  else if (variant === "outline" && disabled) {
    bgClass = tw` border border-primary-400 dark:border-primary-800`
    textClass = tw`text-primary-300 dark:text-primary-900`
  }


  else if (variant === "secondary") {
    bgClass = tw`bg-secondary dark:bg-secondary-dark`
    textClass = tw`text-secondary-foreground dark:text-secondary-dark-foreground`
  }
  else if (variant === "outline") {
    bgClass = tw`border border-primary dark:border-primary-400`
    textClass = tw`text-primary dark:text-primary-400`
  }

  const Icon: any = icon ? Icons[icon] : <></>

  return (
    <PressableOpacity style={[bgClass, cirlceClass, style]} disabled={disabled} onPress={onPress}>
      <Center>
        <Center style={tw`gap-2`}>
          {icon && <Icon style={textClass} size={28} />}
          {!circle && <Interact style={[textClass, tw`text-center px-2`]}>
            {children}
          </Interact>}
        </Center>
      </Center>
    </PressableOpacity>
  )
}

export default Button

