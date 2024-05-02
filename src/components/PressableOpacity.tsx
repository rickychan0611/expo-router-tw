import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

function PressableOpacity({ onPress, children, disabled }: any) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => (
        <View style={{ opacity: pressed ? 0.5 : 1 }}>
          {children}
        </View>
      )}
    </Pressable>
  );
}

export default PressableOpacity;