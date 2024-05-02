import { Redirect, Stack } from 'expo-router';

export default function Layout() {

  // if (userInfo) {
  //   return <Redirect href="/" />
  // }
  
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
