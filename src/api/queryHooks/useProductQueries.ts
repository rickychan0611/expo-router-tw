import { useQuery } from "@tanstack/react-query"
import { productKeys } from "../query-factory"
import { useGetOrderListTypes } from "@/interfaces/productTypes"
import { Order } from "@/interfaces/productTypes"

export const useOrders = (
  { status, page, pagesize, start_time, end_time }: useGetOrderListTypes
) => {
  const res = useQuery(
    productKeys.order.list(status, page, pagesize, start_time, end_time),
  )
  return { ...res, data: res.data as Order[]}
}
