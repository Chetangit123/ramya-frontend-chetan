import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";

export default function RegisterUserForm({ handleNext, switchToLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { auth } = useSelector((store) => store);

  const jwt = localStorage.getItem("jwt");

  const handleClose = () => setOpenSnackBar(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    if (auth.user || auth.error) setOpenSnackBar(true);
  }, [auth.user, auth.error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phoneNumber: data.get("phone"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(register(userData));
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        px: 4,
        py: 5,
        borderRadius: 3,
        backgroundColor: "#fff",
        boxShadow: 3,
      }}
      component={Paper}
      elevation={6}
    >
      <Typography
        variant="h5"
        align="center"
        fontWeight={600}
        sx={{ mb: 3, color: "rgb(85, 31, 61)" }}
      >
        Create Your Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              color="secondary"
              type="email"
            />
          </Grid>

          {/* ✅ Replaced duplicate email with phone field */}
          <Grid item xs={12}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone Number"
              fullWidth
              variant="outlined"
              color="secondary"
              type="tel"
              inputProps={{
                pattern: "[6-9]\\d{9}",
                maxLength: 10,
              }}
              title="Enter a valid 10-digit Indian mobile number"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="new-password"
              variant="outlined"
              color="secondary"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                padding: "0.8rem",
                backgroundColor: "#00281c",
                "&:hover": {
                  backgroundColor: "#00281c",
                },
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>


      <Box display="flex" justifyContent="center" mt={3}>
        <Typography variant="body2">Already have an account?</Typography>
        <Button
          onClick={switchToLogin}
          size="small"
          sx={{ ml: 1, color: "#00281c" }}
        >
          Login
        </Button>
      </Box>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={auth.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {auth.error ? auth.error : auth.user ? "Register Success" : ""}
        </Alert>
      </Snackbar>
    </Box>
  );
}
// Compare this snippet from src/customer/Components/Home/HomeProductSection.jsx: