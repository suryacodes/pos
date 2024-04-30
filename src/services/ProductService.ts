import api from "./Api";
import { ProductPage } from "./types";

const ProductService = {
  getProducts: async (page: number = 1): Promise<ProductPage> => {
    return api.get("/products", {
      params: {
        page,
      },
    });
  },
};

export default ProductService;
