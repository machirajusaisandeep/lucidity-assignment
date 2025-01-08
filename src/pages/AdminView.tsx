import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { RootState, AppDispatch } from "../store";
import { inventoryService } from "../services/api/inventoryService";
import { setProducts, updateStats } from "../store/reducers/inventorySlice";
import StatsWidget from "../components/StatsWidget";
import ProductTable from "../components/ProductTable";

const AdminView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, stats, loading, error } = useSelector(
    (state: RootState) => state.inventory
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await inventoryService.getProducts();
        dispatch(setProducts(data));
        dispatch(updateStats(inventoryService.calculateStats(data)));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>

      {/* Stats Widgets */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={3}>
          <StatsWidget
            title="Total Products"
            value={stats.totalProducts}
            icon="inventory"
          />
        </Grid>
        <Grid item xs={3}>
          <StatsWidget
            title="Store Value"
            value={`$${stats.totalStoreValue}`}
            icon="attach_money"
          />
        </Grid>
        <Grid item xs={3}>
          <StatsWidget
            title="Out of Stock"
            value={stats.outOfStock}
            icon="warning"
          />
        </Grid>
        <Grid item xs={3}>
          <StatsWidget
            title="Categories"
            value={stats.totalCategories}
            icon="category"
          />
        </Grid>
      </Grid>

      {/* Products Table */}
      <Paper>
        <ProductTable products={products} isAdmin={true} />
      </Paper>
    </Box>
  );
};

export default AdminView;
