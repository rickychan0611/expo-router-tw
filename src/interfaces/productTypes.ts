

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

export interface OrderItem {
  supply_order_id: number
  user_id: number
  supplier_id: number
  b2b_product_id: number
  product_pic: string
  product_name_cn: string
  product_name_en: string
  product_description_cn: string
  product_description_en: string
  product_packing_info: string
  product_id_of_supplier: any
  product_category_id: number
  product_category_name_en: string
  product_category_name_cn: string
  product_categories: string
  product_supplier: string
  supply_product_id: string
  product_price: string
  product_quantity: number
  product_raw_amount: number
  tax_id: number
  gst_rate: number
  pst_rate: number
  gst_amount: number
  pst_amount: number
  tax_amount: number
  product_total_amount: number
  updated_at: string
  created_at: string
  id: number
  order_item_id: number
}

export type StateDays = "Yesterday" | "Last 7 days" | "Last 30 days" | "This month" | "This year" | "All time";
export type OrderFilter = "all" | "new" | "delivering" | "cancelled" | "delivered";

export interface OrderFilterQueryParams {
  status: OrderFilter;
  page: number;
  pagesize: number;
  start_timestamp?: string;
  end_timestamp?: string;
}