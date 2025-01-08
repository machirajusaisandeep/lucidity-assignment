import { Paper, Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WarningIcon from "@mui/icons-material/Warning";
import CategoryIcon from "@mui/icons-material/Category";

interface StatsWidgetProps {
  title: string;
  value: string | number;
  icon: "cart" | "money" | "warning" | "category";
}

const StatsWidget = ({ title, value, icon }: StatsWidgetProps) => {
  const getIcon = () => {
    switch (icon) {
      case "cart":
        return <ShoppingCartIcon sx={{ fontSize: 40, color: "#fff" }} />;
      case "money":
        return <AttachMoneyIcon sx={{ fontSize: 40, color: "#fff" }} />;
      case "warning":
        return <WarningIcon sx={{ fontSize: 40, color: "#fff" }} />;
      case "category":
        return <CategoryIcon sx={{ fontSize: 40, color: "#fff" }} />;
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: "100%",
        bgcolor: "#2F4F2F",
        borderRadius: 2,
        boxShadow: "none",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {getIcon()}
        <Box>
          <Typography variant="subtitle1" color="#A8A8A8" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" color="#fff" sx={{ fontWeight: "bold" }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default StatsWidget;
