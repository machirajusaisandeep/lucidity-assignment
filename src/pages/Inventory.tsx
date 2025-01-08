import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { RootState, AppDispatch } from "../store";
import { inventoryService } from "../services/api/inventoryService";
import {
  setProducts,
  updateStats,
  setError,
  setLoading,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from "../store/reducers/inventorySlice";
import StatsWidget from "../components/StatsWidget";
import ProductTable from "../components/ProductTable";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EditProductModal from "../components/EditProductModal";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { Product } from "../services/types/inventory.types";

const Inventory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, stats, loading, error } = useSelector(
    (state: RootState) => state.inventory
  );

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(
    null
  );

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const data = await inventoryService.getProducts();
      dispatch(setProducts(data));
      dispatch(updateStats(inventoryService.calculateStats(data)));
      dispatch(setError(null));
    } catch (err) {
      dispatch(
        setError(
          err instanceof Error
            ? "Please Notify Lucidity Backend - might be too many request : " +
                err.message
            : "Failed to fetch products"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
  };
  const handleEdit = (updatedProduct: Product) => {
    const value = inventoryService.calculateValue(
      updatedProduct.price,
      updatedProduct.quantity
    );
    const productWithValue = { ...updatedProduct, value };
    dispatch(updateProduct(productWithValue));
    dispatch(
      updateStats(
        inventoryService.calculateStats(
          products.map((p) =>
            p.id === updatedProduct.id ? productWithValue : p
          )
        )
      )
    );
    setEditProduct(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
    const updatedProducts = products.filter((p) => p.id !== id);
    dispatch(updateStats(inventoryService.calculateStats(updatedProducts)));
    setDeleteConfirmation(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmation(id);
  };

  const handleToggleVisibility = (id: number) => {
    const newStatus: "active" | "disabled" =
      products.find((p) => p.id === id)?.status === "active"
        ? "disabled"
        : "active";
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    dispatch(toggleProductStatus(id));
    dispatch(updateStats(inventoryService.calculateStats(updatedProducts)));
  };

  if (loading) return <LoadingState />;

  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <Box sx={{ width: "100%", bgcolor: "#121212" }}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom color="white">
          Inventory Stats
        </Typography>

        {/* Stats Widgets */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget
              title="Total Products"
              value={stats.totalProducts}
              icon="cart"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget
              title="Store Value"
              value={`$${stats.totalStoreValue}`}
              icon="money"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget
              title="Out of Stock"
              value={stats.outOfStock}
              icon="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget
              title="Categories"
              value={stats.totalCategories}
              icon="category"
            />
          </Grid>
        </Grid>

        {/* Products Table */}
        <Paper sx={{ bgcolor: "#1E1E1E", boxShadow: "none" }}>
          <ProductTable
            products={products}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onToggleVisibility={handleToggleVisibility}
          />
        </Paper>

        {/* Edit Modal */}
        {editProduct && (
          <EditProductModal
            open={!!editProduct}
            product={editProduct}
            onClose={() => setEditProduct(null)}
            onSave={handleEdit}
          />
        )}

        {/* Delete Confirmation */}
        <ConfirmationDialog
          open={!!deleteConfirmation}
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          onConfirm={() =>
            deleteConfirmation && handleDelete(deleteConfirmation)
          }
          onCancel={() => setDeleteConfirmation(null)}
        />
      </Box>
    </Box>
  );
};

export default Inventory;
