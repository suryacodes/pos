import api from "./Api";

interface ProductResponse {
  name: string;
  weight: string;
  price: number;
  qty: number;
  image: string;
}

const ProductService = {
  getProducts: async (): Promise<ProductResponse[]> => {
    return api.get("/products");
  },
};

export default ProductService;
