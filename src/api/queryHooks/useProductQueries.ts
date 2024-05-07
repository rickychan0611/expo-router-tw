import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { productKeys } from "../query-factory"
import { Order } from "@/interfaces/productTypes"
import { useOrdersStore } from "@/stores"
import useIsLoggedIn from "@/hooks/useIsLoggedIn"
import { api_products } from "../api_products"

export const useOrders = () => {
  const isLoggedIn = useIsLoggedIn()
  //query filter is controlled by orderFilterQueryParams
  const { status, page, pagesize, start_time, end_time } = useOrdersStore((state) => state.orderFilterQueryParams)
  const res = useQuery({
    ...productKeys.order.list(status, page, pagesize, start_time, end_time),
    // enabled: isLoggedIn
  })
  return { ...res, data: res.data as Order[] }
}

export const useInfiniteQueryOrders = () => {

  const { status, page, pagesize, start_time, end_time } = useOrdersStore((state) => state.orderFilterQueryParams)
  const fetchOrder = async ({ pageParam = 1 }) => {
    return api_products.getOrders(status, pageParam, pagesize, start_time, end_time)
  }

  const res = useInfiniteQuery({
    queryKey: ['getOrders', { status, start_time, end_time }],
    queryFn: fetchOrder,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      return lastPage.current_page === lastPage.last_page ? undefined : lastPage.current_page + 1
    },
  })

  return { ...res, pages: res.data?.pages as Order[] }
}
