export interface Product {
  id?: number;
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
  status?: "active" | "disabled";
}
export interface InventoryStats {
  totalProducts: number;
  totalStoreValue: number;
  outOfStock: number;
  totalCategories: number;
}

export interface UpdateProductDTO extends Partial<Product> {
  id: number;
}
