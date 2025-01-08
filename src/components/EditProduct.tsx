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
import { inventoryService } from "../services/api/inventoryService";

interface EditProductModalProps {
  open: boolean;
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

interface FormErrors {
  category?: string;
  price?: string;
  quantity?: string;
}

const EditProductModal: FC<EditProductModalProps> = ({
  open,
  product,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(product);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (field: string, value: string | number) => {
    switch (field) {
      case "category":
        return !value ? "Category is required" : "";
      case "price":
        return !value
          ? "Price is required"
          : !/^\$?\d+(\.\d{0,2})?$/.test(value.toString())
          ? "Invalid price format"
          : "";
      case "quantity":
        return !value
          ? "Quantity is required"
          : Number(value) < 0
          ? "Quantity cannot be negative"
          : "";
      default:
        return "";
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));

    const newFormData = { ...formData, [field]: value };
    if (field === "price" || field === "quantity") {
      const price = field === "price" ? value : formData.price;
      const quantity = field === "quantity" ? Number(value) : formData.quantity;
      newFormData.value = inventoryService.calculateValue(price, quantity);
    }
    setFormData(newFormData);
  };

  useEffect(() => {
    const { category, price, quantity } = formData;
    const hasErrors = Object.values(errors).some((error) => error);
    setIsValid(!!category && !!price && !!quantity && !hasErrors);
  }, [formData, errors]);

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
                onChange={(e) => handleFieldChange(field, e.target.value)}
                error={!!errors[field as keyof FormErrors]}
                helperText={errors[field as keyof FormErrors]}
                disabled={field === "value"}
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
                  "& .MuiFormHelperText-root": {
                    color: "#FF6B6B",
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
