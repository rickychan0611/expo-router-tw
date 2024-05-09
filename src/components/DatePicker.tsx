import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import tw from '@/tw';
import PressableOpacity from './PressableOpacity';
import Calendar from './Calendar';
import { CalendarIcon } from 'lucide-react-native';
import useTheme from '@/hooks/useTheme';
import { Row, RowBetween } from './FlexViews';
import { colors } from '@/colors';
import { MaskedTextInput } from "react-native-mask-text";

type SelectedDate = {
  year: string;
  month: string;
  day: string;
};
type Props = {
  selectedDate: SelectedDate
  setSelectedDate: (date: SelectedDate) => void;
  showDatePicker: boolean;
  setShowDatePicker: (showDatePicker: boolean) => void;
}

const DatePicker = ({ selectedDate, setSelectedDate, showDatePicker, setShowDatePicker }: Props) => {

  const { isDarkColorScheme } = useTheme();

  const onChange = (date: string) => {
    // setSelectedDate(date);
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
        <Row style={tw`gap-1 p-2`}>
          <MaskedTextInput
            mask='9999'
            style={tw`dark:text-white web:w-10`}
            placeholder={"YYYY"}
            inputMode='numeric'
            value={selectedDate.year}
            onChangeText={(text: string) => {
              setSelectedDate({ ...selectedDate, year: text })
            }}
            placeholderTextColor={'#9CA3AF'}
          />
          <Text style={tw`dark:text-white`}>/</Text>
          <MaskedTextInput
            mask='99'
            style={tw`dark:text-white text-center web:w-8`}
            placeholder={"MM"}
            inputMode='numeric'
            value={selectedDate.month}
            onChangeText={(text: string) => {
              setSelectedDate({ ...selectedDate, month: text })
            }}
            placeholderTextColor={'#9CA3AF'}
          />
          <Text style={tw`dark:text-white`}>/</Text>
          <MaskedTextInput
            mask='99'
            style={tw`dark:text-white text-center pr-2 web:w-8`}
            placeholder={"DD"}
            inputMode='numeric'
            value={selectedDate.day}
            onChangeText={(text: string) => {
              setSelectedDate({ ...selectedDate, day: text })
            }}
            placeholderTextColor={'#9CA3AF'}
          />
        </Row>
        <PressableOpacity
          style={tw`justify-center items-center px-1`}
          onPress={showDatepicker} >
          <CalendarIcon size={25} color={isDarkColorScheme ? 'white' : colors.secondary[600]} />
        </PressableOpacity>
      </RowBetween>
    </>
  );
};

export default DatePicker;
