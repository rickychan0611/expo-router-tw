import React, { useState } from 'react';
import { View, Text, Platform, Button, Modal } from 'react-native';
import tw from '@/tw';
import PressableOpacity from './PressableOpacity';
import TextInput from './TextInput';
import Calendar from './Calendar';

type Props = {
  placeholder: string;
}

const DateTimePickerExample = ({ placeholder }: Props) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (date: Date) => {
    console.log(date)
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <>
      <Modal visible transparent >
        <Calendar />
      </Modal>
      <View style={{ flex: 1 }}>
        <PressableOpacity
          onPress={showDatepicker} >
          <TextInput style={tw`flex-1 bg-background rounded text-black placeholder:text-muted`}
            placeholder={placeholder}
            editable={false}
          />
        </PressableOpacity>
      </View>
    </>
  );
};

export default DateTimePickerExample;
