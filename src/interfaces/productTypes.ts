export interface useGetOrderList {
  status: "all" | "new" | "delivering" | "delivered" | "cancelled" | "unsettled" | "settled";
  page: number;
  pagesize: number;
  start_time?: number;
  end_time?: number;  
}

export interface Order {
  id: number
  order_id: string
  user_id: number
  supplier_id: number
  status: number
  confirm_status: number
  review_status: number
  supplier_settle_status: number
  supplier_settle_id: number
  product_raw_amount: string
  product_gst_amount: string
  product_pst_amount: string
  product_total_amount: string
  user_shipping_total_amount: string
  pay_amount: string
  place_time: string
  deliver_time: string
  confirm_time: string
  cancel_time: any
  supplier_settle_time: any
  review_time: any
  process_note: string
  file_url: any
  buyer_str: string
  order_items_str: string
}