import axios from 'axios'
import { GET, POST, POST_NO_TOKEN } from './apiCalls'

export const api_user = {

  sendSignInCode: async (phone: string) => {
    // console.log("ipResponsexxxxxxxxx")
    // const ipResponse = await axios.get("https://api.ipify.org/?format=json")
    // console.log("ipResponsexxxxxxxxx", ipResponse)
    return await POST_NO_TOKEN("/api/b2b/supplier/sendcodeforlogin", { phone })
  },

  login: async (user_name: string, verifycode: string) => {
    return await POST_NO_TOKEN("/api/b2b/supplier/login", { user_name, verifycode })
  },

  getUserInfo: async () => {
    return await GET("/api/b2b/supplier/info", undefined)
  },

  logout: async () => {
    return await POST("/api/b2b/supplier/logout", undefined)
  },

  deleteUser: async () => {
    return await POST("/api/b2b/supplier/delete", undefined)
  }

}