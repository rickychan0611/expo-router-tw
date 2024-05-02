import { ReactNode } from "react";
import { Text, TextProps } from "react-native"
import tw from '@/tw'

interface Props extends TextProps {
  children: ReactNode;
  style?: any
};

export const H1 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-1000 text-[48px] text-black dark:text-white`, style]}
    >{props.children}
    </Text>
  )
}

export const H2 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-900 text-[30px] text-black dark:text-white`, style]}
    >{props.children}
    </Text>
  )
}

export const H3 = ({ style, ...props }: Props) => {
  return (
    <Text
      style={[tw`font-mi-700 text-[24px] text-black dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

export const H4 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-800 text-[20px] text-black dark:text-white`, style]}
    >{props.children}
    </Text>
  )
}

export const H5 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-600 text-[18px] text-black dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

export const P = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-400 text-[16px] text-black dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

export const BlockQuote = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-300 italic relative rounded-md bg-muted text-black  p-4 text-[14px]`, style]}
    > {props.children}
    </Text >
  )
}

export const Code = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-300 italic relative rounded-md bg-muted text-black p-4 text-[14px]`, style]}
    > {props.children}
    </Text >
  )
}

export const Interact = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-500 text-[16px] text-black dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

export const Lead = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-600 text-[20px] text-black dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

export const Large = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-700 text-[18px] text-black dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

export const Small = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-600 text-[10px] text-black dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

export const Error = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-500 text-red-500`, style]}
    > {props.children}
    </Text >
  )
}

export const Muted = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-500 text-muted dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

export const Subtle = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-500 text-[14px] text-black dark:text-white`, style]}
    > {props.children}
    </Text >
  )
}

