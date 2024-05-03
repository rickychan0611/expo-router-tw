import React, { useCallback, useEffect, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import Container from '@/components/Container'
import { Error, H4, Muted } from '@/components/Typography'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '@/components/Button'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { OtpInput } from "react-native-otp-entry";
import BackAndTitle from '@/components/BackAndTitle'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api_user } from '@/api/api_user'
import tw from "@/tw"

type Props = {}

const SignIn = (props: Props) => {
  const router = useRouter()
  const phone = useLocalSearchParams().phone + "" || ""
  const [count, setCount] = useState(5);
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("")

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prevCount - 1;
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  const queryClient = useQueryClient();

  const sendCodeMutation = useMutation({
    mutationFn: () => api_user.sendSignInCode(phone),
  });

  const logInMutation = useMutation({
    mutationFn: (code: string) => {
      console.log(code)
      return api_user.login(phone, code)
    },
    onError: (err) => {
      console.log("onError", err)
      setErr("Code Invalid")
    },
    onSuccess: async (res: any) => {
      console.log("onSuccess", res)
      await AsyncStorage.setItem("userToken", res.data.data)
      queryClient.invalidateQueries({ queryKey: ["userInfo"] })
      router.push('/')
    }
  });

  const handleResend = () => {
    setCount(5);
    sendCodeMutation.mutate()
  }
  const handleSubmit = async (code: string) => {
    logInMutation.mutate(code)
  }

  return (
    <Container>
      <View style={tw`absolute z-50`}>
        <BackAndTitle />
      </View>
      <KeyboardAwareScrollView>
        <View style={tw`items-center p-4 sm:p-[100px] w-full`}> 
          <View style={tw`sm:bg-card mt-4 items-center w-full max-w-lg sm:shadow-xl sm:shadow-muted dark:shadow-none rounded sm:p-20`}>

            <H4 style={tw`mt-8 text-center`}>
              Verify Account
            </H4>

            <Muted style={tw`mt-4 text-center`}>
              Enter the one-time code we sent to
            </Muted>

            <H4 style={tw` text-center mt-3 mb-8`}>
              {phone}
            </H4>

            <OtpInput
              numberOfDigits={6}
              onTextChange={(text) => {
                setErr("")
                setOtp(text)
              }}
              textInputProps={{
                maxFontSizeMultiplier: 0.1
              }}
              theme={{
                containerStyle: tw`flex-1 w-full max-w-[95%] min-w-[300px]`,
                pinCodeContainerStyle: tw` min-h-14 min-w-10 h-full bg-white border-2`,
                pinCodeTextStyle: tw`text-red-400 text-xl`,
                focusStickStyle: tw`bg-red-400`,
                focusedPinCodeContainerStyle: tw`border-red-300`,
              }}
              onFilled={(text) => handleSubmit(text)}
            />
            <Error style={tw`my-ml`}>{err || ""}</Error>
            <Button variant="outline"
              onPress={handleResend}
              disabled={count !== 0}
            >
              {count > 0 ? "(" + count + "s)" : "Resend Code?"}
            </Button>

          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
}

export default SignIn
