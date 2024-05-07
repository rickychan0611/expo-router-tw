import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const URL = process.env.EXPO_PUBLIC_HOST_URL

export const GET = async (api: string, params?: any) => {
  console.log("GGGGGG", api, params)
  const userToken = await AsyncStorage.getItem("userToken")
  try {
    const response = await axios.get(URL + api,
      {
        params, headers: {
          Authorization: userToken + "",
          "Key-name": "userarticle",
          "Key-value": "K1RlBHKFQN0ujNuuQOOhoHA9r12QXTOf"
        }
      })
    return response.data.data
  }
  catch (err: any) {
    //console.warn("get apiCalls err", api, params, err)
    return err
  }
}

export const POST = async (api: string, body?: any) => {
  const userToken = await AsyncStorage.getItem("userToken")
  if (userToken) {
    try {
      const response = await axios.post(URL + api,
        body, { headers: { Authorization: userToken } })
      if (response.data.code === 200) {
        return response.data
      }
      else throw (response)
    }
    catch (err: any) {
      return err
    }
  }
}

export const POST_NO_TOKEN: any = async (api: string, body: any) => {
  try {
    const response = await axios.post(URL + api, body)
    return response
  }
  catch (err: any) {
    throw (err)
  }
}

export const FORM_POST = async (api: string, body: any) => {
  const userToken = await AsyncStorage.getItem("userToken")
  if (userToken) {
    try {
      const response = await axios.post(URL + api,
        body, {
        headers: {
          Authorization: userToken,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    }
    catch (err: any) {
      return err
    }
  }
}
