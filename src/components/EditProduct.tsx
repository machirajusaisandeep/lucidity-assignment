import { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../services/types/inventory.types";

interface EditProductModalProps {
  open: boolean;
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const EditProductModal: FC<EditProductModalProps> = ({
  open,
  product,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(product);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { category, price, quantity } = formData;
    setIsValid(!!category && !!price && !!quantity);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "#1E1E1E",
          color: "white",
          minWidth: "500px",
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h6">Edit Product</Typography>
          <Typography variant="subtitle2" sx={{ color: "#A8A8A8", mt: 0.5 }}>
            {product.name}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "#d8f96c" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {["category", "price", "quantity", "value"].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field as keyof Product]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.4)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#d8f96c",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#A8A8A8",
                    "&.Mui-focused": {
                      color: "#d8f96c",
                    },
                  },
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: "#d8f96c",
              "&:hover": { opacity: 0.8 },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            sx={{
              bgcolor: "#d8f96c",
              color: "#000",
              "&:hover": {
                bgcolor: "#d8f96c",
                opacity: 0.8,
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(216, 249, 108, 0.3)",
                color: "rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProductModal;
