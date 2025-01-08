export interface Product {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  id?: number;
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
