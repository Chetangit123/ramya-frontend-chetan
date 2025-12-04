import React from "react";
import { Box, Container, Typography } from "@mui/material";

// Replace this with the correct path to your image
import comingSoonImage from "./assets/Black and Gold Elegant Stylish Grand Opening Event Invitation_20250902_113553_0000.png"; // <- Update if needed

const ComingSoon = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffffff", // Optional dark background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={comingSoonImage}
          alt="Coming Soon"
          sx={{
            maxWidth: "100%",
            height: "auto",
            width: { xs: "100%", sm: "100%", md: "100%" },
            mx: "auto",
          }}
        />
      </Container>
    </Box>
  );
};

export default ComingSoon;
