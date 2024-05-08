import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Modal } from 'react-native';
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
type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  showDatePicker: boolean;
  setShowDatePicker: (showDatePicker: boolean) => void;
}
const Calendar = ({ selectedDate, setSelectedDate, showDatePicker, setShowDatePicker }: Props) => {

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const handleDayPress = (day: number) => {
    setSelectedDate(day.toString());
  };

  const handleNextMonthPress = () => {
    const nextMonth = month + 1;
    const nextYear = nextMonth === 12 ? year + 1 : year;
    const nextMonthData = getMonthData(nextYear, nextMonth % 12);

    setSelectedDate('');
    setMonth(nextMonth);
    setYear(nextYear);
  };

  const handlePrevMonthPress = () => {
    const prevMonth = month - 1;
    const prevYear = prevMonth < 0 ? year - 1 : year;
    const prevMonthData = getMonthData(prevYear, prevMonth >= 0 ? prevMonth : 11);

    setSelectedDate('');
    setMonth(prevMonth >= 0 ? prevMonth : 11);
    setYear(prevYear);
  };

  const RenderCalendar = () => {
    const monthData = getMonthData(year, month);
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
              {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
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
            {week.map((day, idx) => (
              <TouchableOpacity
                key={idx}
                style={[tw`rounded flex-1 w-auto h-12 justify-center items-center`]}
                onPress={() => handleDayPress(day)}
              >
                {/* selected day circle */}
                {selectedDate && day === Number(selectedDate) &&
                  <View style={[tw`w-11 h-11 absolute`,
                  tw`bg-red-200 dark:bg-primary rounded-full`,
                  ]} />}

                {/* day number */}
                <Text style={[tw`text-lg text-black dark:text-white`]}>
                  {day || ''}
                </Text>

                {/* today dot */}
                {day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() &&
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

