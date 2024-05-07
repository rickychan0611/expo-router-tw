import { Order, OrderFilter, OrderFilterQueryParams } from "@/interfaces/productTypes";
import { create } from "zustand";

type SectionListData = {
  title: string
  data: Order[]
}[]

type AppState = {
  orderFilter: OrderFilter
  setOrderFilter: (filter: OrderFilter) => void;
  openFilterMenu: boolean
  setOpenFilterMenu: (open: boolean) => void
  topBarHeight: number
  setTopBarHeight: (height: number) => void
  orderFilterQueryParams: OrderFilterQueryParams
  setOrderFilterQueryParams: (params: OrderFilterQueryParams) => void
  orderSectionData: SectionListData
  setOrderSectionData: (data: SectionListData) => void
};

export const useOrdersStore = create<AppState>((set) => ({
  orderFilter: "all",
  setOrderFilter: (filter) => set({ orderFilter: filter }),
  openFilterMenu: false,
  setOpenFilterMenu: (open) => set({ openFilterMenu: open }),
  topBarHeight: 0,
  setTopBarHeight: (height) => set({ topBarHeight: height }),

  orderFilterQueryParams: { //default 
    status: "all",
    page: 1,
    pagesize: 20
  },
  setOrderFilterQueryParams: (params) => set({ orderFilterQueryParams: params }),

  orderSectionData: [],
  setOrderSectionData: (data) => set({ orderSectionData: data }),

}));
