import { Order, OrderFilter, OrderFilterQueryParams, StateDays } from "@/interfaces/productTypes";
import { create } from "zustand";

type SectionListData = {
  title: string
  data: Order[]
}[]

type AppState = {
  count: number;
  themeKey: string;
  triggerThemeKey: () => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  statsFilter: StateDays;
  setStatsFilter: (filter: StateDays) => void;
  orderFilter: OrderFilter
  setOrderFilter: (filter: OrderFilter) => void;
  openFilterMenu: boolean
  setOpenFilterMenu: (open: boolean) => void
  topBarHeight: number
  setTopBarHeight: (height: number) => void
  tabBarHeight: number
  setTabBarHeight: (height: number) => void
  orderFilterQueryParams: OrderFilterQueryParams
  setOrderFilterQueryParams: (params: OrderFilterQueryParams) => void
  orderListData: SectionListData
  setOrderListData: (data: SectionListData) => void
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  themeKey: "light",
  triggerThemeKey: () => set((state) => ({ themeKey: state.themeKey === "light" ? "dark" : "light" })),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  statsFilter: "Yesterday",
  setStatsFilter: (filter) => set({ statsFilter: filter }),
  orderFilter: "all",
  setOrderFilter: (filter) => set({ orderFilter: filter }),
  openFilterMenu: false,
  setOpenFilterMenu: (open) => set({ openFilterMenu: open }),
  topBarHeight: 0,
  setTopBarHeight: (height) => set({ topBarHeight: height }),
  tabBarHeight: 0,
  setTabBarHeight: (height) => set({ tabBarHeight: height }),

  orderFilterQueryParams: { //default 
    status: "all",
    page: 1,
    pagesize: 5
  },
  setOrderFilterQueryParams: (params) => set({ orderFilterQueryParams: params }),

  orderListData: [],
  setOrderListData: (data) => set({ orderListData: data }),

}));
