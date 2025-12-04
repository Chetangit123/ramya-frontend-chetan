import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Fade,
} from "@mui/material";

const ContactForm = () => {
  // Sample state to handle submission feedback
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Add validation and API calls here
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, md: 4 },
        background:
          "linear-gradient(90deg, #f0eafc 0%, #e2e2f5 100%)", // Soft gradient
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              py: { xs: 2, md: 6 },
            }}
          >
            <Typography variant="h3" sx={{ color: "#551F3D", fontWeight: 700 }}>
              Ramya Vastram equals elegance & tradition
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#551F3D", fontWeight: 500, mt: 2 }}
            >
              Just give us a call!
            </Typography>
            <Typography paragraph sx={{ mt: 2, color: "#333" }}>
              We strive to constantly enhance the quality of our sarees and dresses, so that
              you can cherish them as much as we love creating them.
            </Typography>
            <Typography paragraph sx={{ color: "#333" }}>
              Bulk orders for boutiques and businesses receive special perks.
              Just ring a bell or message to explore.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography
                component="address"
                sx={{
                  fontStyle: "normal",
                  fontSize: "1.1rem",
                  color: "#551F3D",
                  fontWeight: 500,
                }}
              >
                +91 91791-37954
                <br />
                <a
                  href="mailto:info@ramyavastram.com"
                  style={{ color: "#551F3D", textDecoration: "none" }}
                >
                  info@ramyavastram.com
                </a>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Form Section */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              maxWidth: 480,
              width: "100%",
              mx: "auto",
              background:
                "linear-gradient(105deg, #fff 0%, #f4eef6 100%)", // Gentle inner background
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold", mb: 3, color: "#551F3D" }}
            >
              Get In Touch
            </Typography>
            <Fade in={submitted}>
              <Alert severity="success" sx={{ mb: 2 }}>
                Thank you for contacting us! We will get back to you soon.
              </Alert>
            </Fade>
            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
              </Fade>
            )}
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              onSubmit={handleSubmit}
            >
              <TextField label="Name" variant="outlined" fullWidth required />
              <TextField label="Email" type="email" variant="outlined" fullWidth required />
              <TextField label="Phone" type="tel" variant="outlined" fullWidth required />
              <TextField
                label="Your Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(90deg, #551F3D 0%, #9C4668 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  py: 1.5,
                  boxShadow: 2,
                  "&:hover": { background: "linear-gradient(90deg, #9C4668, #551F3D)" },
                }}
              >
                Submit Now
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
