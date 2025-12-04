import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Radio,
  Box,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const sizeOptions = [
  { label: "XS", bust: 32, front: 50, waist: 24, outseam: 37.5, inseam: 26.5 },
  { label: "S", bust: 34, front: 50, waist: 26, outseam: 38, inseam: 27 },
  { label: "M", bust: 36, front: 50, waist: 28, outseam: 38, inseam: 27 },
  { label: "L", bust: 38, front: 50, waist: 30, outseam: 38.5, inseam: 27.5 },
  { label: "XL", bust: 40, front: 50, waist: 32, outseam: 38.5, inseam: 27.5 },
  { label: "XXL", bust: 42, front: 50, waist: 34, outseam: 39, inseam: 28 },
  { label: "3XL", bust: 44, front: 50, waist: 36, outseam: 39, inseam: 28 },
];

export default function SizeChartSidebar() {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        variant="contained"
        sx={{
          position: "fixed",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          bgcolor: "#c2185b",
          color: "white",
          borderRadius: "4px 0 0 4px",
          zIndex: 1300,
        }}
      >
        Size Chart
      </Button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: { xs: 300, sm: 400 }, p: 2 }} role="presentation">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="#c2185b">Size Chart</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Table size="small" sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Size</TableCell>
                <TableCell>To Fit Bust</TableCell>
                <TableCell>Front Length</TableCell>
                <TableCell>Waist</TableCell>
                <TableCell>Outseam</TableCell>
                <TableCell>Inseam</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sizeOptions.map((size) => (
                <TableRow key={size.label}>
                  <TableCell>
                    <Radio
                      checked={selectedSize === size.label}
                      onChange={() => setSelectedSize(size.label)}
                      value={size.label}
                      color="primary"
                    />
                    {size.label}
                  </TableCell>
                  <TableCell>{size.bust}</TableCell>
                  <TableCell>{size.front}</TableCell>
                  <TableCell>{size.waist}</TableCell>
                  <TableCell>{size.outseam}</TableCell>
                  <TableCell>{size.inseam}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" gutterBottom>
            Seller: <span style={{ color: "#c2185b", fontWeight: 600 }}>H & S Studio LLP</span>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            * Garment Measurements in Inches
          </Typography>

          <Box mt={4}>
            <Typography variant="subtitle2">How to measure yourself</Typography>
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3755/8034/files/how-to-measure.png"
              alt="Measurement Guide"
              style={{ width: "100%", maxWidth: 200, marginTop: 8 }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
