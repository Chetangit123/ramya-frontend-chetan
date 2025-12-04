import React from 'react';
import { Box, Typography, Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Replace with your own QR code image URL
const QR_IMAGE_URL = 'https://backend.ramyavastram.com/uploads/productImages/1754379426672.jpeg';

const PaymentUI = () => {
  // Replace with your WhatsApp number (country code included, no +)
  const whatsappNumber = '919999999999';

  // WhatsApp pre-filled message
  const whatsappMessage = encodeURIComponent('I have completed the payment. Please find the screenshot attached.');

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f6f6f6"
      position="relative"
      fontFamily="Roboto, sans-serif"
      p={3}
    >
      <Typography variant="h5" component="h2" gutterBottom color="textPrimary" align="center">
        Please share screenshot after payment
      </Typography>

      <Box
        bgcolor="#fff"
        borderRadius={2}
        boxShadow={2}
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={4}
      >
        <img
          src={QR_IMAGE_URL}
          alt="Manual QR Code"
          width={200}
          height={200}
          style={{ borderRadius: 8, marginBottom: 16 }}
        />
        <Typography variant="body1" color="textSecondary">
          Scan this QR to make payment
        </Typography>
      </Box>

      {/* Floating WhatsApp Button */}
      <Fab
        color="success"
        aria-label="whatsapp"
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          boxShadow: 3,
          fontSize: 28,
        }}
      >
        <WhatsAppIcon fontSize="large" />
      </Fab>
    </Box>
  );
};

export default PaymentUI;
