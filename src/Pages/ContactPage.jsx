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
import emailjs from "emailjs-com";

const SERVICE_ID = "service_vqr6bdp";
const TEMPLATE_ID ="template_fero9yc";
const PUBLIC_KEY = "2DqLvlkbZAAFDnR1a";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    // Send email via EmailJS
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setError("Failed to send your message. Please try again.");
      });
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, background: "linear-gradient(90deg, #f0eafc 0%, #e2e2f5 100%)", minHeight: "100vh" }}>
      <Grid container spacing={4} sx={{ flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center" }}>
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: "center", md: "left" }, py: { xs: 2, md: 6 } }}>
            <Typography variant="h3" sx={{ color: "#551F3D", fontWeight: 700 }}>
              Ramya Vastram equals elegance & tradition
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: "#551F3D", fontWeight: 500, mt: 2 }}>
              Just give us a call!
            </Typography>
            <Typography paragraph sx={{ mt: 2, color: "#333" }}>
              We strive to constantly enhance the quality of our sarees and dresses...
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography component="address" sx={{ fontStyle: "normal", fontSize: "1.1rem", color: "#551F3D", fontWeight: 500 }}>
                +91 91791-37954
                <br />
                <a href="mailto:info@ramyavastram.com" style={{ color: "#551F3D", textDecoration: "none" }}>
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
              background: "linear-gradient(105deg, #fff 0%, #f4eef6 100%)",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", mb: 3, color: "#551F3D" }}>
              Get In Touch
            </Typography>

            {submitted && (
              <Fade in={submitted}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Thank you for contacting us! We will get back to you soon.
                </Alert>
              </Fade>
            )}

            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
              </Fade>
            )}

            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
              <TextField label="Name" name="name" value={formData.name} onChange={handleChange} variant="outlined" fullWidth required />
              <TextField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" variant="outlined" fullWidth required />
              <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" variant="outlined" fullWidth required />
              <TextField label="Your Message" name="message" value={formData.message} onChange={handleChange} variant="outlined" fullWidth multiline rows={4} required />
              <Button type="submit" variant="contained" size="large" sx={{
                background: "linear-gradient(90deg, #551F3D 0%, #9C4668 100%)",
                color: "#fff",
                fontWeight: 600,
                py: 1.5,
                boxShadow: 2,
                "&:hover": { background: "linear-gradient(90deg, #9C4668, #551F3D)" },
              }}>
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
