

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import tw from '@/tw';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Card from './Card';
import useTheme from '@/hooks/useTheme';
import { Row, RowBetween } from './FlexViews';
import { H5, Interact } from './Typography';
import PressableOpacity from './PressableOpacity';

interface MonthData {
  year: number;
  month: number;
  data: number[][];
}

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthData = (year: number, month: number): MonthData => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalDays = daysInMonth(year, month);
  const data: number[][] = [];

  let day = 1;
  for (let i = 0; i < 6; i++) {
    const week: number[] = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || day > totalDays) {
        week.push(0);
      } else {
        week.push(day++);
      }
    }
    data.push(week);
  }

  return { year, month, data };
};

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
/**
 * Renders a calendar component that allows the user to select a date with a calendar modal.
 *
 * @param {Props} props - The component props.
 * @param {SelectedDate} props.selectedDate - The currently selected date.
 * @param {function} props.setSelectedDate - The function to update the selected date.
 * @param {boolean} props.showDatePicker - Whether the date picker is visible.
 * @param {function} props.setShowDatePicker - The function to update the visibility of the date picker.
 * @return {JSX.Element} The rendered calendar component.
 */
const Calendar = ({ selectedDate, setSelectedDate, showDatePicker, setShowDatePicker }: Props) => {

  const [onYear, setOnYear] = useState<number>(new Date().getFullYear());
  const [onMonth, setOnMonth] = useState<number>(new Date().getMonth());

  useEffect(() => {
    if (selectedDate.day && selectedDate.month && selectedDate.year) {
      setOnYear(+selectedDate.year)
      setOnMonth(+selectedDate.month - 1)
    }
    else {
      setOnYear(new Date().getFullYear())
      setOnMonth(new Date().getMonth())
    }
  }, [selectedDate])

  const handleDayPress = (day: number) => {
    setSelectedDate({
      ...selectedDate, day: day + "", month: (onMonth + 1) + "", year: (onYear) + ""
    })
  }

  const handleNextMonthPress = () => {
    const nextMonth = (onMonth + 1) % 12;
    const nextYear = nextMonth === 0 ? onYear + 1 : onYear;

    setOnMonth(nextMonth);
    setOnYear(nextYear);
  };

  const handlePrevMonthPress = () => {
    const prevMonth = (onMonth + 11) % 12;
    const prevYear = prevMonth === 11 ? onYear - 1 : onYear;

    setOnMonth(prevMonth);
    setOnYear(prevYear);
  };

  const RenderCalendar = () => {
    const monthData = getMonthData(onYear, onMonth);
    const { isDarkColorScheme } = useTheme();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <>
        <View style={tw`w-full m-2 pr-4`}>
          <RowBetween>
            <H5>Date</H5>
            <PressableOpacity onPress={() => setShowDatePicker(false)}>
              <Interact style={tw`text-secondary-500 `}>Done</Interact>
            </PressableOpacity>
          </RowBetween>
          <RowBetween style={tw`mt-4 mb-2`}>
            <H5>
              {new Date(+onYear, +onMonth).toLocaleString('default', { month: 'long' })} {onYear}
            </H5>
            <Row style={tw`gap-7`}>
              <TouchableOpacity onPress={handlePrevMonthPress}>
                <ChevronLeft size={26} color={isDarkColorScheme ? 'white' : 'black'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonthPress}>
                <ChevronRight size={26} color={isDarkColorScheme ? 'white' : 'black'} />
              </TouchableOpacity>
            </Row>
          </RowBetween>
        </View>
        <View style={tw`w-full flex-row`}>
          {weekDays.map((day, idx) => (
            <View key={idx} style={[tw`flex-1 w-full h-10 justify-center items-center`]}>
              <Text style={tw`text-sm text-black dark:text-white`}>{day}</Text>
            </View>
          ))}
        </View>
        {monthData.data.map((week, index) => (
          <View key={index} style={tw`w-full flex-row`}>
            {week.map((mapDay: number, idx: number) => (
              <TouchableOpacity
                key={idx}
                style={[tw`rounded flex-1 w-auto h-12 justify-center items-center`]}
                onPress={() => handleDayPress(mapDay)}
              >
                {/* selected day circle */}
                {mapDay === +selectedDate.day && onMonth === +selectedDate.month - 1 && onYear === +selectedDate.year &&
                  <View style={[tw`w-11 h-11 absolute`,
                  mapDay > 0 && tw`bg-red-200 dark:bg-primary rounded-full`,
                  ]} />}

                {/* day number */}
                <Text style={[tw`text-lg text-black dark:text-white`]}>
                  {mapDay || ''}
                </Text>

                {/* today dot */}
                {mapDay === new Date().getDate() && onMonth === new Date().getMonth() && onYear === new Date().getFullYear() &&
                  <View style={tw`w-1 h-1 bg-red-500 rounded-full absolute bottom-2`} />}

              </TouchableOpacity>
            ))}
          </View>
        ))}
      </>
    );
  };

  return (
    <Modal visible={showDatePicker} transparent >
      <View style={tw`flex-1 w-full justify-center items-center p-4 bg-[rgba(0,0,0,0.4)]`}>
        <Card style={tw`w-full max-w-xl`}>
          <RenderCalendar />
        </Card>
      </View>
    </Modal>
  );
};

export default Calendar;

