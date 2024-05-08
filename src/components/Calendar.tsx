import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '@/tw';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Card from './Card';
import BackDrop from './BackDrop';
import useTheme from '@/hooks/useTheme';

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

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
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
    const {isDarkColorScheme} = useTheme();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <>
        <View style={tw`flex-row w-full justify-between items-center mb-3`}>
          <TouchableOpacity onPress={handlePrevMonthPress}
            style={tw`w-12 h-14 justify-center items-center bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-0 rounded`}>
            <ChevronLeft size={24} color={isDarkColorScheme ? 'white' : 'black'} />
          </TouchableOpacity>
          <Text style={tw`text-lg text-black dark:text-white`}>{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</Text>
          <TouchableOpacity onPress={handleNextMonthPress}
            style={tw`w-12 h-14 justify-center items-center bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-0 rounded`}>
            <ChevronRight size={24} color={isDarkColorScheme ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
        <View style={tw`w-full flex-row`}>
          {weekDays.map((day, idx) => (
            <View key={idx} style={[tw`flex-1 w-full h-14 justify-center items-center border border-gray-300 dark:border-neutral-700`, tw`bg-gray-100 dark:bg-neutral-800`]}>
              <Text style={tw`text-sm text-black dark:text-white`}>{day}</Text>
            </View>
          ))}
        </View>
        {monthData.data.map((week, index) => (
          <View key={index} style={tw`w-full flex-row`}>
            {week.map((day, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  tw`flex-1 w-full h-14 justify-center items-center border border-gray-300 dark:border-neutral-700`,
                  day === Number(selectedDate) ? tw`bg-red-200 dark:bg-primary` : tw`bg-white dark:bg-black`,
                  !day ? tw`bg-gray-100 dark:bg-neutral-900` : null
                ]}
                onPress={() => handleDayPress(day)}
              >
                <Text style={tw`text-lg text-black dark:text-white`}>{day || ''}</Text>
                {day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() &&
                  <View style={tw`w-2 h-2 bg-red-500 rounded-full absolute bottom-1`}></View>}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={tw`flex-1 w-full justify-center items-center p-4 bg-[rgba(0,0,0,0.4)]`}>
      <Card style={tw`w-full max-w-xl`}>
        <RenderCalendar />
      </Card>
    </View>
  );
};

export default Calendar;

