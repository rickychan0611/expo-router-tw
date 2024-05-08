import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Blocks, Home, UserRound, ScrollText, LayoutDashboard, ClipboardList, Boxes, Store } from 'lucide-react-native';
import tw from '@/tw'
import { colors } from '@/colors'
import { useAppColorScheme } from 'twrnc';
import { useAppStore } from '@/stores';
import useColorScheme from '@/hooks/useTheme';
import { Row } from './FlexViews';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import PressableOpacity from './PressableOpacity';

export default function TabBar({ state, descriptors, navigation, router }: any) {
  const insets = useSafeAreaInsets();
  const count = useAppStore((state) => state.count);
  const { isDarkColorScheme } = useColorScheme();
  const setTabBarHeight = useAppStore((state) => state.setTabBarHeight);

  const Icon = (props: any) => {
    const label = props.label
    const Component =
      label === "Home" ? LayoutDashboard :
        label === "Order" ? ClipboardList :
          label === "Listings" ? Boxes : Store
    return <Component size={30} />
  }

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setTabBarHeight(height);
  };

  return (
    <View style={[tw`justify-between w-full flex-row bg-card dark:bg-card-dark`, { paddingBottom: insets?.bottom || 6 }]}
      onLayout={onLayout}>
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

          const color = isFocused ?
            (isDarkColorScheme ? colors.primary.dark.DEFAULT : colors.primary.DEFAULT) :
            (isDarkColorScheme ? colors.muted.dark : colors.muted.DEFAULT)

          return (
            <View style={tw`flex-1`} key={index}>
              <PressableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={tw`items-center justify-center`}
              >
                <View style={tw`flex-col mt-2 gap-1 items-center `}
                >
                  {label === "Home" ? <LayoutDashboard color={color} size={30} key={tw.memoBuster + index} /> :
                    label === "Order" ? <ClipboardList color={color} size={30} /> :
                      label === "Listings" ? <Boxes color={color} size={30} /> :
                        <Store color={color} size={30} />
                  }
                  <Text style={isFocused ? tw`text-primary dark:text-primary-dark text-sm` : tw`text-muted dark:text-muted-dark text-sm `}>
                    {label}
                  </Text>
                </View>
              </PressableOpacity>
            </View>
          );
        }
      })
      }
      <Row style={tw`gap-1 pr-4`}>
        <LanguageToggle />
        <ThemeToggle />
      </Row>
    </View >
  );
}
