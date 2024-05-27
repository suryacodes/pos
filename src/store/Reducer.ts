import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductService } from "../services";
import { Product, ProductPage } from "../services/types";
import ProductDB from "../services/ProductDatabase";

interface InitialState {
  products: Product[];
  isLoading: boolean;
  error: boolean;
  errorMessage: string | undefined;
  totalPages: number;
  currentPage: number;
  totalProducts: number;
}

const initialState: InitialState = {
  products: [],
  totalPages: 0,
  currentPage: 0,
  totalProducts: 0,
  isLoading: false,
  error: false,
  errorMessage: undefined,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateQuantityProducts: (
      state: InitialState,
      action: PayloadAction<{ productId: number; qty: number }>
    ): InitialState => {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.productId === action.payload.productId) {
            return {
              ...product,
              qty: action.payload.qty,
            };
          }
          return product;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsyc.pending, (state: InitialState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductAsyc.fulfilled,
        (state: InitialState, action: PayloadAction<ProductPage>) => {
          state.products = [...state.products, ...action.payload.products];
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalProducts = action.payload.totalProducts;
          state.isLoading = false;
        }
      )
      .addCase(fetchProductAsyc.rejected, (state: InitialState, action) => {
        const error = action.error;
        state.error = true;
        state.errorMessage = error.message;
        state.isLoading = false;
      });
  },
});

export const fetchProductAsyc = createAsyncThunk(
  "product/fetchProduct",
  async (page: number): Promise<ProductPage> => {
    const products = await ProductService.getProducts(page);
    await ProductDB.addProducts(products.products);
    return products;
  }
);

export const { updateQuantityProducts } = productSlice.actions;

export default productSlice;
