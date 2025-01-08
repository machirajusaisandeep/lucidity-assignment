# Inventory Management App

## Context

You are building an **Inventory Management App** for Lucidity as part of a coding challenge. The app has two views: **Admin** and **User**.

### **Features Overview**

1. **Admin View**

   - Edit products.
   - Delete products.
   - Disable products (disable entire row and actions).
   - Dynamically update metrics (total products, total value, out-of-stock items, number of categories).

2. **User View**
   - Read-only mode to view products.
   - Action buttons disabled.

### **Evaluation Criteria**

- Proficiency in **React** with **TypeScript**.
- **Code quality**: Clean, scalable, correct, and secure code.
- Reasonable **UI/UX** aligned with the provided guidelines.
- Proper state management using **Redux**.
- Submission requirements:
  - A **video** explaining your approach and challenges.
  - GitHub repository.
  - Deployment link (e.g., Vercel).

---

## Step-by-Step Implementation Guide

### **Tech Stack**

- React (with Vite for fast development).
- TypeScript (for type safety).
- Material UI (for consistent and modern design).
- Redux (for state management).

---

### **Step 1: Initial Setup**

1. **Initialize the project:**

   ```bash
   npm create vite@latest inventory-management --template react-ts
   cd inventory-management
   npm install
   ```

2. **Install dependencies:**

   ```bash
   npm install @mui/material @emotion/react @emotion/styled react-redux @reduxjs/toolkit axios
   ```

3. **Set up folder structure:**
   ```plaintext
   src/
   ├── components/       # For reusable components
   ├── pages/            # For Admin and User views
   ├── redux/            # Redux store and slices
   ├── utils/            # Utility functions and API calls
   ├── App.tsx
   └── main.tsx
   ```

### **Step 2: Fetch and Display Inventory Data**

1. Create a utility file for API calls:

   ```typescript
   // src/utils/api.ts
   import axios from "axios";

   export const fetchInventory = async () => {
     const response = await axios.get(
       "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
     );
     return response.data;
   };
   ```

2. Set up Redux store and slice:

   ```typescript
   // src/redux/store.ts
   import { configureStore } from "@reduxjs/toolkit";
   import inventoryReducer from "./inventorySlice";

   export const store = configureStore({
     reducer: { inventory: inventoryReducer },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;
   ```

   ```typescript
   // src/redux/inventorySlice.ts
   import { createSlice, PayloadAction } from "@reduxjs/toolkit";

   interface Product {
     id: string;
     name: string;
     price: number;
     quantity: number;
     category: string;
     disabled: boolean;
   }

   interface InventoryState {
     products: Product[];
   }

   const initialState: InventoryState = { products: [] };

   const inventorySlice = createSlice({
     name: "inventory",
     initialState,
     reducers: {
       setProducts(state, action: PayloadAction<Product[]>) {
         state.products = action.payload;
       },
       editProduct(state, action: PayloadAction<Product>) {
         const index = state.products.findIndex(
           (p) => p.id === action.payload.id
         );
         if (index !== -1) state.products[index] = action.payload;
       },
       deleteProduct(state, action: PayloadAction<string>) {
         state.products = state.products.filter((p) => p.id !== action.payload);
       },
       disableProduct(state, action: PayloadAction<string>) {
         const product = state.products.find((p) => p.id === action.payload);
         if (product) product.disabled = true;
       },
     },
   });

   export const { setProducts, editProduct, deleteProduct, disableProduct } =
     inventorySlice.actions;
   export default inventorySlice.reducer;
   ```

3. Fetch and display data in `AdminView`:

   ```typescript
   // src/pages/AdminView.tsx
   import React, { useEffect } from "react";
   import { useDispatch, useSelector } from "react-redux";
   import { fetchInventory } from "../utils/api";
   import { setProducts } from "../redux/inventorySlice";
   import { RootState } from "../redux/store";

   const AdminView: React.FC = () => {
     const dispatch = useDispatch();
     const products = useSelector(
       (state: RootState) => state.inventory.products
     );

     useEffect(() => {
       fetchInventory().then((data) => dispatch(setProducts(data)));
     }, [dispatch]);

     return (
       <div>
         <h1>Admin View</h1>
         <table>
           <thead>
             <tr>
               <th>Name</th>
               <th>Price</th>
               <th>Quantity</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {products.map((product) => (
               <tr key={product.id}>
                 <td>{product.name}</td>
                 <td>{product.price}</td>
                 <td>{product.quantity}</td>
                 <td>
                   <button>Edit</button>
                   <button>Delete</button>
                   <button>Disable</button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     );
   };

   export default AdminView;
   ```

---

### **Step 3: Iterative Features**

- Add modal for editing product details.
- Add logic for deleting and disabling products.
- Implement metrics calculation and display.
- Create a separate `UserView` with disabled action buttons.

---

### **Step 4: Deployment**

- Push code to GitHub.
- Deploy on Vercel or Netlify.

---

### **Deliverables Checklist**

1. A video explaining your implementation.
2. GitHub repository.
3. Live deployment link.

---

Start with **Step 1** and commit each completed step to ensure a realistic coding history.
