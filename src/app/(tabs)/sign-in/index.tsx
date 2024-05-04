import React, { useCallback, useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { View, Text, StatusBar } from 'react-native'
import TextInput from '@/components/TextInput'
import Container from '@/components/Container'
import { H4, Muted, Error } from '@/components/Typography'
import logo from '@/assets/icons/app-icon-circle.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { api_user } from '@/api/api_user'
import Button from '@/components/Button'
import tw from "@/tw"

const SignIn = () => {
  const router = useRouter()
  const [phone, setPhone] = useState<string>("")
  const [t] = useTranslation("common")
  const [err, setErr] = useState("")
  
  const sendCodeQuery = useMutation({
    mutationFn: () => api_user.sendSignInCode(phone),
    onError: (err) => {
      console.log("onError", err)
      setErr("Invalid Phone Number")
    },
    onSuccess: () => router.push({ pathname: '/sign-in/verify-code', params: { phone } }),
  });

  const handleChange = (text: string) => {
    setErr("")
    const numericValue = text.replace(/[^0-9]/g, '');
    setPhone(numericValue);
  };

  const handleSubmit = () => {
    sendCodeQuery.mutate()
  }

  useEffect(() => {
    return () => sendCodeQuery.reset()
  }, [])

  return (
    <Container>
      <KeyboardAwareScrollView>
        <View style={tw`items-center p-4 sm:p-[100px] w-full mt-10 sm:mt-0`}>
          <View style={tw`sm:bg-card sm:dark:bg-card-dark mt-4 items-center w-full max-w-lg sm:shadow-xl sm:shadow-neutral-200 dark:shadow-none rounded sm:p-20`}>
            <H4 style={tw`text-center`}>
              Sign in to your account
            </H4>
            <Image source={logo} style={tw`mt-10 w-16 h-16`}
              contentFit='contain' />
            <Muted style={tw`mt-4 text-center`}>
              Harmony Builds Wealth, Together We Flourish
            </Muted>

            <TextInput
              placeholder={t`Phone number`}
              inputMode='numeric'
              value={phone}
              onChangeText={handleChange}
              onSubmitEditing={handleSubmit}
              style={tw`mt-8 w-full`}
            />

            <Error style={tw`mt-2`}>
              {err || ""}
            </Error>

            <View style={tw`w-full mt-7`}>
              <Button
                disabled={sendCodeQuery.isPending}
                onPress={() => handleSubmit()}>
                Continue
              </Button>
            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container >
  )
}

export default SignIn
