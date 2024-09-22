import axios from "axios";
import { create } from "zustand";
import { APIURL } from "./Constants";

const useShopStore = create((set) => ({
  shopData: null,
  loading: false,
  error: null,

  fetchShopData: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${APIURL}shop/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ shopData: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching shop data:", error);
      set({ error: "Error fetching shop data", loading: false });
    }
  },
}));

export default useShopStore;
