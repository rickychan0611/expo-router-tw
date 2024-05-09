import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { productKeys } from "../query-factory"
import { Order } from "@/interfaces/productTypes"
import { useOrdersStore } from "@/stores"
import useIsLoggedIn from "@/hooks/useIsLoggedIn"
import { api_products } from "../api_products"

export const useOrder = (order_id: string) => {
  const res = useQuery({
    queryKey: ['order', {order_id}],
    queryFn: () => api_products.getOrder(order_id)
  })
  return {...res, data: res?.data?.data as Order}
}

export const useInfiniteQueryOrders = () => {

  const { status, page, pagesize, start_timestamp, end_timestamp} = useOrdersStore((state) => state.orderFilterQueryParams)
  const fetchOrders = async ({ pageParam = 1 }) => {
    return api_products.getOrders(status, pageParam, pagesize, start_timestamp, end_timestamp)
  }

  const res = useInfiniteQuery({
    queryKey: ['orders', { status, start_timestamp, end_timestamp }],
    queryFn: fetchOrders,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      return lastPage.current_page === lastPage.last_page ? undefined : lastPage.current_page + 1
    },
  })

  return { ...res, pages: res.data?.pages }
}
