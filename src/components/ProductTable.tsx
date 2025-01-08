import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Product } from "../services/types/inventory.types";

interface ProductTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
  onToggleVisibility?: (id: number) => void;
}

const ProductTable: FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleVisibility,
}) => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#d8f96c" }}>
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  padding: "4px 8px",
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                Name
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#d8f96c" }}>
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  padding: "4px 8px",
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                Category
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#d8f96c" }}>
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  padding: "4px 8px",
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                Price
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#d8f96c" }}>
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  padding: "4px 8px",
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                Quantity
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#d8f96c" }}>
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  padding: "4px 8px",
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                Value
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#d8f96c" }}>
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  padding: "4px 8px",
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                Actions
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{
                opacity: product.status === "disabled" ? 0.5 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
              <TableCell sx={{ color: "white" }}>{product.category}</TableCell>
              <TableCell sx={{ color: "white" }}>{product.price}</TableCell>
              <TableCell sx={{ color: "white" }}>{product.quantity}</TableCell>
              <TableCell sx={{ color: "white" }}>{product.value}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onEdit?.(product)}
                    disabled={!isAdmin || product.status === "disabled"}
                    sx={{
                      color: "#90EE90",
                      "&:hover": { color: "#32CD32" },
                      "&.Mui-disabled": { color: "rgba(144, 238, 144, 0.3)" },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onToggleVisibility?.(product.id ?? 0)}
                    disabled={!isAdmin}
                    sx={{
                      color:
                        product.status === "disabled" ? "#BA55D3" : "#9400D3",
                      "&:hover": { color: "#9400D3" },
                      "&.Mui-disabled": { color: "rgba(186, 85, 211, 0.3)" },
                    }}
                  >
                    {product.status === "disabled" ? (
                      <VisibilityIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete?.(product.id ?? 0)}
                    disabled={!isAdmin}
                    sx={{
                      color: "#FF6B6B",
                      "&:hover": { color: "#FF0000" },
                      "&.Mui-disabled": { color: "rgba(255, 107, 107, 0.3)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
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
