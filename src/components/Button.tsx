import React from 'react'
import { Interact } from './Typography'
import { Center, Row } from './FlexViews'
import PressableOpacity from './PressableOpacity'
import * as Icons from './Icons';
import tw from "@/tw";

type Props = {
  children?: React.ReactNode,
  variant?: "primary" | "secondary" | "outline",
  disabled?: boolean,
  onPress?: () => void,
  style?: any,
  icon?: keyof typeof Icons,
  circle?: boolean
}

const Button: React.FC<Props> = ({ children, variant, disabled, style, icon, circle, onPress }, props) => {
  // default
  let bgClass = tw`bg-primary dark:bg-primary-dark`
  let textClass = tw`text-primary-foreground dark:text-primary-dark-foreground`
  const cirlceClass = circle ? tw`rounded-full p-sm` : tw`rounded py-sm px-m`

  //disabled
  if (!variant && disabled) {
    bgClass = tw`bg-primary-200 border border-primary-200`
    textClass = tw`text-primary-400`
  }
  else if (variant === "secondary" && disabled) {
    bgClass = tw`bg-secondary-300 border border-secondary-300`
    textClass = tw`text-secondary-100`
  }
  else if (variant === "outline" && disabled) {
    bgClass = tw`border border-primary-300`
    textClass = tw`text-primary-300`
  }

  //normal
  else if (variant === "secondary") {
    bgClass = tw`bg-secondary web:hover:bg-secondary-700 border border-secondary web:hover:border-secondary-700`
    textClass = tw`text-secondary-foreground`
  }
  else if (variant === "outline") {
    bgClass = tw`border border-primary dark:border-primary-dark`
    textClass = tw`text-primary`
  }

  const Icon: any = icon ? Icons[icon] : <></>

  return (
    <PressableOpacity style={[style, bgClass, cirlceClass]} disabled={disabled} onPress={onPress}>
      <Center>
        <Row style={tw`gap-2`}>
          {icon && <Icon style={textClass} />}
          {!circle && <Interact style={textClass}>
            {children}
          </Interact>}
        </Row>
      </Center>
    </PressableOpacity>
  )
}

export default Button

