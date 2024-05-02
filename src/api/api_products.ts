import axios from 'axios'
import { GET, POST, POST_NO_TOKEN } from './apiCalls'

export const api_products = {

  productslist: async () => {
    return await GET("/api/b2b/supplier/supplyproductslist",
      { pagesize: 100000, page: 1 })
  },
  supplynestedcategories: async (supplier_id: string) => {
    return await GET("/api/b2b/shopping/supplynestedcategories",
      { supplier_id, pagesize: 100000, page: 1 })
  },
  supplycateproducts: async (category_id: string) => {
    return await GET("/api/b2b/supplier/supplycateproducts",
      { category_id, pagesize: 100000, page: 1 })
  },
  getOrders: async (
    status: "new" | "delivering" | "delivered" | "cancelled" | "unsettled" | "settled" | "all",
    page?: number, 
    pagesize?: number,
    start_time?: number, 
    end_time?: number) => {
    return await GET("/api/b2b/supplier/supplyorders",
      { status, pagesize, page, start_time, end_time })
  },
  getOrder: async (order_id: string) => {
    return await GET("/api/b2b/supplier/supplyorder",
      { order_id })
  },
  process: async (order_id: string, process: string) => {
    return await POST("/api/b2b/supplier/supplyorder/process",
      { order_id, process })
  },
  supplysettlementsummary: async () => {
    return await GET("/api/b2b/supplier/supplysettlementsummary",
      undefined)
  },
  supplysettlementrecords: async () => {
    return await GET("/api/b2b/supplier/supplysettlementrecords",
      undefined)
  }
}