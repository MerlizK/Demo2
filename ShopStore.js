import axios from "axios";
import { create } from "zustand";
import { HeadersToken, APIURL } from "./Constants";

const useShopStore = create((set) => ({
  shopData: null,
  loading: false,
  error: null,

  fetchShopData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${APIURL}shop/info`, HeadersToken);
      set({ shopData: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching shop data:", error);
      set({ error: "Error fetching shop data", loading: false });
    }
  },
}));

export default useShopStore;
