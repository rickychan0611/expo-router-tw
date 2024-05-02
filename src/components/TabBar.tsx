import React, { useEffect } from 'react'
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Blocks, Home, UserRound, ScrollText, LayoutDashboard, ClipboardList, Boxes, Store } from 'lucide-react-native';
import tw from '@/tw'
import { colors } from '@/colors'
import { useAppColorScheme } from 'twrnc';
import { useAppStore } from '@/stores';

export default function TabBar({ state, descriptors, navigation, router }: any) {
  const insets = useSafeAreaInsets();
  const count = useAppStore((state) => state.count);
  const Icon = (props: any) => {
    const label = props.label
    const Component =
      label === "Home" ? LayoutDashboard :
        label === "Order" ? ClipboardList :
          label === "Listings" ? Boxes : Store
    return <Component size={30} />
  }

  // const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  // // const colorScheme = useColorScheme();
  // useEffect(() => {
  //   console.log("xxxxxxxx", tw.memoBuster)
  // }, [colorScheme, router.pathname])

  return (
    <View style={[tw`flex-row bg-card-light dark:bg-card-dark`, { paddingBottom: insets?.bottom || 6 }]}>
      {state.routes.map((route: any, index: number) => {

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (
          label === "Home" ||
          label === "Order" ||
          label === "Listings" ||
          label === "SignIn"
        ) {

          const color = isFocused ? colors.primary.DEFAULT : colors.muted

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <View style={tw`flex-col mt-2 gap-1 justify-center items-center `}
              >
                {label === "Home" ? <LayoutDashboard color={color} size={30} key={tw.memoBuster + index} /> :
                  label === "Order" ? <ClipboardList color={color} size={30} /> :
                    label === "Listings" ? <Boxes color={color} size={30} /> :
                      <Store color={color} size={30} />
                }
                <Text style={isFocused ? tw`text-primary text-sm` : tw`text-muted text-sm `}>
                  {label}
                </Text>
                {/* <Text style={tw`text-muted`}>useColorScheme(): {colorScheme}</Text> */}
              </View>
            </TouchableOpacity>
          );
        }
      })
      }
    </View >
  );
}
