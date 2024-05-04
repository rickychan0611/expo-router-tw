import { ReactNode } from "react";
import { Text, TextProps } from "react-native"
import tw from '@/tw'

interface Props extends TextProps {
  children: ReactNode;
  style?: any
};

export const H1 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-bold text-[32px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const H2 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-bold text-[28px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const H3 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-semi text-[24px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const H4 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-reg text-[20px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const H5 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-med text-[18px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const Subhead = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-demi text-[16px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const P1 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-reg text-[16px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const P2 = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-demi text-[14px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const BlockQuote = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-reg italic relative rounded-md bg-muted text-black  p-4 text-[14px]`, style]}>
      {props.children}
    </Text>
  )
}

export const Code = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-reg italic relative rounded-md bg-muted text-black p-4 text-[14px]`, style]}>
      {props.children}
    </Text>
  )
}

export const Interact = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-reg text-[16px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const Lead = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-semi text-[20px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const Large = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-semi text-[18px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const Small = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-reg text-[12px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const Xsmall = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-med text-[10px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const Error = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-med text-red-500`, style]}>
      {props.children}
    </Text>
  )
}

export const Muted = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-reg text-muted dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

export const Subtle = ({ style, ...props }: Props) => {
  return (
    <Text {...props} style={[tw`font-mi-med text-[14px] text-black dark:text-white`, style]}>
      {props.children}
    </Text>
  )
}

