import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { api_products } from './api_products'

export const productKeys = createQueryKeyStore({
  order: {
    list: (status, page, pagesize, start_time, end_time) => ({
      queryKey: [{ status, page, pagesize, start_time, end_time }],
      queryFn: () => api_products.getOrders(status, page, pagesize, start_time, end_time),
    }),
  },
})
