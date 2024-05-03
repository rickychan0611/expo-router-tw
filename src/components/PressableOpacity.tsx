import tw from '@/tw';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

function PressableOpacity({ style, onPress, children, disabled, bgColor }: any) {
  const [hoveStyle, setHoveStyle] = React.useState<any>("");
  return (
    <Pressable onPress={onPress} disabled={disabled}
    >
      {({ pressed }) => (
        <View>
          <View style={[style, { opacity: pressed ? 0.5 : 1, backgroundColor: bgColor }]}>
            {children}
          </View>
        </View>
      )}
    </Pressable>
  );
}

export default PressableOpacity;