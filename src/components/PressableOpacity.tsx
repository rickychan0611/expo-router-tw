import tw from '@/tw';
import React from 'react';
import { Pressable, View } from 'react-native';

function PressableOpacity({ style, onPress, children, disabled, full }: any) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={style}
    >
      {({ pressed }) => (
        <View style={[style, { opacity: pressed ? 0.5 : 1 }]}>
          {children}
        </View>
      )}
    </Pressable>
  );
}

export default PressableOpacity;