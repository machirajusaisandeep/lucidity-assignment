import { Product, InventoryStats } from "../types/inventory.types";

const INVENTORY_API = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

const parsePrice = (price: string): number => {
  return Number(price.replace("$", "")) || 0;
};

export const inventoryService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(INVENTORY_API);
    const data = await response.json();
    return data.map((product: Product, index: number) => ({
      ...product,
      id: index + 1,
      status: "active",
    }));
  },

  calculateStats: (products: Product[]): InventoryStats => {
    const activeProducts = products.filter((p) => p.status !== "disabled");
    return {
      totalProducts: activeProducts.length,
      totalStoreValue: activeProducts.reduce((sum, p) => {
        const price = parseFloat(p.price.replace("$", ""));
        return sum + price * p.quantity;
      }, 0),
      outOfStock: activeProducts.filter((p) => p.quantity === 0).length,
      totalCategories: new Set(activeProducts.map((p) => p.category)).size,
    };
  },

  calculateValue: (price: string, quantity: number): string => {
    const numericPrice = parseFloat(price.replace("$", ""));
    return `$${(numericPrice * quantity).toFixed(2)}`;
  },

  // Local operations (no API calls) - these can be converted to apis calls if needed
  updateProduct: (products: Product[], updatedProduct: Product): Product[] => {
    const formattedProduct = {
      ...updatedProduct,
      value: updatedProduct.value.startsWith("$")
        ? updatedProduct.value
        : `$${updatedProduct.value}`,
      price: updatedProduct.price.startsWith("$")
        ? updatedProduct.price
        : `$${updatedProduct.price}`,
    };

    return products.map((product) =>
      product.id === formattedProduct.id ? formattedProduct : product
    );
  },

  deleteProduct: (products: Product[], productId: number): Product[] => {
    return products.filter((product) => product.id !== productId);
  },

  toggleProductStatus: (products: Product[], productId: number): Product[] => {
    return products.map((product) =>
      product.id === productId
        ? {
            ...product,
            status: product.status === "active" ? "disabled" : "active",
          }
        : product
    );
  },
};
