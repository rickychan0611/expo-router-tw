import React, { FC, ReactNode } from 'react'
import tw from '@/tw'
import { View, ViewProps } from 'react-native'

interface Props extends ViewProps {
  children: ReactNode;
  style?: ViewProps['style'];
};

export const Row: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-row items-center`, style]} {...props}>
    {children}
  </View>
)

export const RowBetween: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-row items-center justify-between`, style]} {...props}>
    {children}
  </View>
)

export const Center: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-row items-center justify-center`, style]} {...props}>
    {children}
  </View>
)

export const ColCenter: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-col items-center justify-center`, style]} {...props}>
    {children}
  </View>
)

