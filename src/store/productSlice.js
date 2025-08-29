import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API'den ürünleri çekmek için thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit = 25, offset = 0, filter = "", sort = "" }) => {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit);
    if (offset) params.append("offset", offset);
    if (filter) params.append("filter", filter);
    if (sort) params.append("sort", sort);

    const response = await axios.get(
      `http://localhost:5000/products?${params.toString()}`
    );
    return response.data; // API’den düz dizi veya {products, total} dönebilir
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    total: 0,
    loading: false,
    page: 1,
    limit: 25,
    filter: "",
    sort: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 1; // filtre değişirse sayfa sıfırla
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || action.payload; // API’ye göre
        state.total = action.payload.total || action.payload.length;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setSort, setPage } = productSlice.actions;
export default productSlice.reducer;
