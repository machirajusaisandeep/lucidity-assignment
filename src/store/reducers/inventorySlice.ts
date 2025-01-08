import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, InventoryStats } from "../../services/types/inventory.types";

interface InventoryState {
  products: Product[];
  stats: InventoryStats;
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  products: [],
  stats: {
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStock: 0,
    totalCategories: 0,
  },
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateStats: (state, action: PayloadAction<InventoryStats>) => {
      state.stats = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    toggleProductStatus: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload
          ? {
              ...product,
              status: product.status === "active" ? "disabled" : "active",
            }
          : product
      );
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  updateStats,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} = inventorySlice.actions;

export default inventorySlice.reducer;
