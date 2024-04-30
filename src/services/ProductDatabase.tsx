import Dexie, { Table } from "dexie";
import { Product } from "./types";

class ProductDatabase extends Dexie {
  products!: Table<Product, number>;

  constructor() {
    super("ProductDatabase");
    this.version(1).stores({
      products:
        "&productId, name, weight, qty, image, price, updated_at, created_at",
    });
  }

  async addProducts(products: Product[]): Promise<boolean> {
    await this.transaction("rw", this.products, async () => {
      for (let i = 0; i < products.length; i++) {
        const existingProduct = await this.getProduct(products[i].productId);
        if (
          existingProduct &&
          existingProduct.updated_at === products[i].updated_at
        ) {
          continue;
        }
        await this.products.add(products[i]);
      }
    });
    return true;
  }

  async getProducts(page: number = 1, limit: number = 10): Promise<Product[]> {
    const offset = (page - 1) * limit;
    return this.products.toCollection().offset(offset).limit(limit).toArray();
  }

  getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  clearProducts = async (): Promise<void> => {
    await this.products.clear();
  };
}

const ProductDB = new ProductDatabase();

export default ProductDB;
