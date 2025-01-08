import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { RootState, AppDispatch } from "../store";
import { inventoryService } from "../services/api/inventoryService";
import {
  setProducts,
  updateStats,
  setError,
  setLoading,
} from "../store/reducers/inventorySlice";
import StatsWidget from "../components/StatsWidget";
import ProductTable from "../components/ProductTable";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

const AdminView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, stats, loading, error } = useSelector(
    (state: RootState) => state.inventory
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

  if (loading) return <LoadingState />;

  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <Box sx={{ width: "100%", bgcolor: "#121212" }}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom color="white">
          Inventory Management
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
          <ProductTable products={products} />
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminView;
