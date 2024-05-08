import React, { useState } from 'react';
import { View, Text, Platform, Button, Modal } from 'react-native';
import tw from '@/tw';
import PressableOpacity from './PressableOpacity';
import TextInput from './TextInput';
import Calendar from './Calendar';
import { CalendarCheckIcon, CalendarIcon } from 'lucide-react-native';
import useTheme from '@/hooks/useTheme';
import { RowBetween } from './FlexViews';
import { colors } from '@/colors';

type Props = {
  placeholder: string;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  showDatePicker: boolean;
  setShowDatePicker: (showDatePicker: boolean) => void;
}

const DateTimePickerExample = ({ placeholder, selectedDate, setSelectedDate, showDatePicker, setShowDatePicker }: Props) => {

  const { isDarkColorScheme } = useTheme();

  const onChange = (date: Date) => {
    console.log(date)
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };


  return (
    <>
      <Calendar
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <RowBetween style={tw`flex-1 border border-muted bg-input dark:bg-input-dark rounded`}>
        <TextInput style={tw`flex-1 bg-input dark:bg-input-dark`}
          placeholder={placeholder}
          inputMode='numeric'
        />
        <PressableOpacity
          style={tw`justify-center items-center px-1`}
          onPress={showDatepicker} >
          <CalendarIcon size={25} color={isDarkColorScheme ? 'white' : colors.secondary[600]} />
        </PressableOpacity>
      </RowBetween>
    </>
  );
};

export default DateTimePickerExample;
