import { useQuery } from "@tanstack/react-query"
import { api_user } from "../api_user"

const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => api_user.getUserInfo(),
  })
}

export { useGetUserInfo }