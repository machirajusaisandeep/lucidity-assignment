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
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete?.(product.id)}
                    disabled={!isAdmin}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onToggleVisibility?.(product.id)}
                    disabled={!isAdmin}
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
