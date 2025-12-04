import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  hexToRgb,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"
import { Height } from "@mui/icons-material";
export default function LoginUserForm({ switchToRegister, switchToForgot }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const alreadyReloaded = sessionStorage.getItem("loginReloaded");

    if (auth.user && !alreadyReloaded) {
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });

      sessionStorage.setItem("loginReloaded", "true");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (auth.error) {
      setIsSubmitting(false);
      let errorMessage = auth.error;

      if (
        auth.error.includes("user not found") ||
        auth.error.includes("not registered")
      ) {
        toast.error("User Not Registered", { theme: "colored" });
      } else if (
        auth.error.includes("email") ||
        auth.error.includes("Email")
      ) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format",
        }));
        toast.error("Please enter a valid email", { theme: "colored" });
      } else if (
        auth.error.includes("password") ||
        auth.error.includes("Password")
      ) {
        setErrors((prev) => ({
          ...prev,
          password: "Invalid password",
        }));
      } else if (auth.error.includes("credentials")) {
        setErrors({
          email: "Invalid credentials",
          password: "Invalid credentials",
        });
      } else {
        console.log("error", auth.error);
        toast.error(errorMessage, { theme: "colored" });
      }
    }
  }, [auth.user, auth.error]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return false;
    }
    return true;
  };

  const handleEmailBlur = (e) => {
    const email = e.target.value;
    if (email && !validateEmail(email)) {
      toast.warning("Please enter a valid email address", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    setErrors({ email: "", password: "" });

    if (!email) {
      setErrors({ email: "Email is required" });
      toast.error("Email is required", { theme: "colored" });
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Invalid email format" });
      toast.error("Please enter a valid email address", { theme: "colored" });
      setIsSubmitting(false);
      return;
    }

    if (!password) {
      setErrors({ password: "Password is required" });
      toast.error("Password is required", { theme: "colored" });
      setIsSubmitting(false);
      return;
    }

    dispatch(login({ email, password }));
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        px: 4,
        py: 5,
        borderRadius: 3,
        backgroundColor: "#fff",
        boxShadow: 3,
        position: "relative",
      }}
      component={Paper}
      elevation={6}
    >
      <ToastContainer />

      <Typography
        variant="h5"
        align="center"
        fontWeight={600}
        sx={{ mb: 3, color: "rgb(85, 31, 61)" }}
      >
        Login to Your Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              error={!!errors.email}
              helperText={errors.email}
              onBlur={handleEmailBlur}
              disabled={isSubmitting}
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
              autoComplete="current-password"
              variant="outlined"
              color="secondary"
              error={!!errors.password}
              helperText={errors.password}
              disabled={isSubmitting}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                padding: "0.8rem",
                backgroundColor: "#00281c",
                "&:hover": {
                  backgroundColor: "#00281c",
                },
              }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* <div style={{ width: "100%", Height: "50px", marginTop: "20px" }}>
        <GoogleLogin

          onSuccess={(credentialResponse) => {
            const token = credentialResponse.credential;
            const decoded = jwtDecode(token);
            console.log("Decoded Google JWT:", decoded); // optional

            dispatch(loginWithGoogle(token));
          }}
          onError={() => {
            toast.error("User is not register.", {
              position: "top-center",
              theme: "colored",
            });
          }}
        />

      </div> */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        <Button
          onClick={switchToForgot}
          size="small"
          sx={{ color: "#00281c", textTransform: "none" }}
          disabled={isSubmitting}
        >
          Forgot Password?
        </Button>

        <Box display="flex" alignItems="center">
          <Typography variant="body2">Don't have an account?</Typography>
          <Button
            onClick={switchToRegister}
            size="small"
            sx={{ ml: 1, color: "#00281c" }}
            disabled={isSubmitting}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
