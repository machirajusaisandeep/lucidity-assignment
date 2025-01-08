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
import EditProductModal from "../components/EditProduct";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { Product } from "../services/types/inventory.types";

const AdminView = () => {
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

  const handleEdit = (product: Product) => {
    setEditProduct(product);
  };

  const handleEditSave = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct));
    dispatch(
      updateStats(
        inventoryService.calculateStats([
          ...products.filter((p) => p.id !== updatedProduct.id),
          updatedProduct,
        ])
      )
    );
    setEditProduct(null);
  };

  const handleDelete = (id: number) => {
    setDeleteConfirmation(id);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation) {
      dispatch(deleteProduct(deleteConfirmation));
      dispatch(
        updateStats(
          inventoryService.calculateStats(
            products.filter((p) => p.id !== deleteConfirmation)
          )
        )
      );
      setDeleteConfirmation(null);
    }
  };

  const handleToggleVisibility = (id: number) => {
    dispatch(toggleProductStatus(id));
    const updatedProducts = products.map((p) =>
      p.id === id
        ? {
            ...p,
            status:
              p.status === "active"
                ? ("disabled" as const)
                : ("active" as const),
          }
        : p
    );
    dispatch(updateStats(inventoryService.calculateStats(updatedProducts)));
  };

  if (loading) return <LoadingState />;

  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <Box sx={{ width: "100%", bgcolor: "#121212", minHeight: "100vh" }}>
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleVisibility={handleToggleVisibility}
          />
        </Paper>

        {/* Edit Modal */}
        {editProduct && (
          <EditProductModal
            open={!!editProduct}
            product={editProduct}
            onClose={() => setEditProduct(null)}
            onSave={handleEditSave}
          />
        )}

        {/* Delete Confirmation */}
        <ConfirmationDialog
          open={!!deleteConfirmation}
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirmation(null)}
        />
      </Box>
    </Box>
  );
};

export default AdminView;
