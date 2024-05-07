import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { productKeys } from "../query-factory"
import { Order } from "@/interfaces/productTypes"
import { useAppStore } from "@/stores"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useIsLoggedIn from "@/hooks/useIsLoggedIn"
import { api_products } from "../api_products"

export const useOrders = () => {
  const isLoggedIn = useIsLoggedIn()
  //query filter is controlled by orderFilterQueryParams
  const { status, page, pagesize, start_time, end_time } = useAppStore((state) => state.orderFilterQueryParams)
  const res = useQuery({
    ...productKeys.order.list(status, page, pagesize, start_time, end_time),
    // enabled: isLoggedIn
  })
  return { ...res, data: res.data as Order[] }
}

export const useInfiniteQueryOrders = () => {
  
  const { status, page, pagesize, start_time, end_time } = useAppStore((state) => state.orderFilterQueryParams)
  const fetchOrder = async ({ pageParam = 1 }) => {
    console.log("pageParam", pageParam)
    return api_products.getOrders(status, pageParam, pagesize, start_time, end_time)
  }

  const res = useInfiniteQuery({
    queryKey: ['getOrders'],
    queryFn: fetchOrder,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage?.page + 1,
  })

  console.log("data: res.data", res.data)
  return res
}
