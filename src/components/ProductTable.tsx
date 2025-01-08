import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Product } from "../services/types/inventory.types";

interface ProductTableProps {
  products: Product[];
  isAdmin: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
  onToggleVisibility?: (id: number) => void;
}

const ProductTable: FC<ProductTableProps> = ({
  products,
  isAdmin,
  onEdit,
  onDelete,
  onToggleVisibility,
}) => {
  return (
    <TableContainer sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>Name</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Category</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Price</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Quantity</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Value</TableCell>
            <TableCell sx={{ color: "text.secondary" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                opacity: product.status === "disabled" ? 0.5 : 1,
              }}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.value}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onEdit?.(product)}
                    disabled={!isAdmin || product.status === "disabled"}
                    sx={{
                      color: "#90EE90", // Light green
                      "&:hover": { color: "#32CD32" }, // Darker green on hover
                      "&.Mui-disabled": { color: "rgba(144, 238, 144, 0.3)" },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete?.(product.id)}
                    disabled={!isAdmin}
                    sx={{
                      color: "#FF6B6B", // Red
                      "&:hover": { color: "#FF0000" }, // Darker red on hover
                      "&.Mui-disabled": { color: "rgba(255, 107, 107, 0.3)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onToggleVisibility?.(product.id)}
                    disabled={!isAdmin}
                    sx={{
                      color: "#BA55D3", // Purple
                      "&:hover": { color: "#9400D3" }, // Darker purple on hover
                      "&.Mui-disabled": { color: "rgba(186, 85, 211, 0.3)" },
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
