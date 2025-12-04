import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../config/api";

// ...imports remain same
export default function ForgotPasswordFlow({ switchToLogin }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const cooldownRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (otpCooldown > 0) {
      cooldownRef.current = setInterval(() => {
        setOtpCooldown((prev) => {
          if (prev <= 1) clearInterval(cooldownRef.current);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(cooldownRef.current);
  }, [otpCooldown]);

  const notify = (msg, type = "error") =>
    toast[type](msg, {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });

  // ✅ Modified to return boolean
  const sendOtp = async (emailToUse) => {
    try {
      const resp = await api.post(`/api/users/forget-password`, { email: emailToUse });
      if (resp.status === 200) {
        toast.success("OTP sent to your email.");
        setOtpCooldown(60);
        return true;
      }
      return false;
    } catch (error) {
      console.log("dfgdfjgkdfdjgfkhg");
      notify(error.response?.data?.error || "Failed to send OTP. Try again.");
      return false;
    }
  };

  const formStyles = {
    py: 1.2,
    backgroundColor: "#00281c",
    "&:hover": { backgroundColor: "#00281c" },
  };

  // ✅ Only advance step if sendOtp is successful
  const onSubmitEmail = async ({ email }) => {
    setIsSubmitting(true);
    setEmail(email);
    const otpSent = await sendOtp(email);
    if (otpSent) {
      setStep("otp");
    }
    setIsSubmitting(false);
  };

  const onSubmitOtp = async ({ otp }) => {
    setOtp(otp);
    setStep("reset");
  };

  const onSubmitReset = async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return notify("Passwords do not match");
    }
    setIsSubmitting(true);
    try {
      const resp = await api.post("/api/users/reset-password", {
        email,
        otp,
        password,
      });

      if (resp.status === 200) {
        toast.success("Password reset successful!");
        reset();
        setStep("email");
        switchToLogin();
      }
    } catch (error) {
      notify(error.response?.data?.error || "Failed to reset password. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ...Render functions remain unchanged
  const renderEmailForm = () => (
    <form onSubmit={handleSubmit(onSubmitEmail)}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Registered Email"
            fullWidth
            variant="outlined"
            color="secondary"
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={formStyles}
      >
        {isSubmitting ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );

  const renderOtpForm = () => (
    <form onSubmit={handleSubmit(onSubmitOtp)}>
      <Controller
        name="otp"
        control={control}
        rules={{
          required: "OTP is required",
          pattern: {
            value: /^\d{6}$/,
            message: "Enter a valid 6-digit OTP",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Enter 6-digit OTP"
            fullWidth
            variant="outlined"
            color="secondary"
            error={!!errors.otp}
            helperText={errors.otp?.message}
            inputProps={{ maxLength: 6 }}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={formStyles}
      >
        {isSubmitting ? "Verifying..." : "Verify OTP"}
      </Button>
      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1 }}
        disabled={otpCooldown > 0}
        onClick={() => sendOtp(email)}
      >
        {otpCooldown > 0 ? `Resend OTP in ${otpCooldown}s` : "Resend OTP"}
      </Button>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={handleSubmit(onSubmitReset)}>
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 characters" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            color="secondary"
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        rules={{ required: "Please confirm your password" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            color="secondary"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            disabled={isSubmitting}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={formStyles}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1, color: "#00281c" }}
        onClick={() => setStep("otp")}
        disabled={isSubmitting}
      >
        ← Back to OTP
      </Button>
    </form>
  );

  return (
    <Box
      component={Paper}
      elevation={6}
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
    >
      <ToastContainer />
      <Typography
        variant="h5"
        align="center"
        fontWeight={600}
        sx={{ mb: 2, color: "rgb(85, 31, 61)" }}
      >
        {step === "email"
          ? "Forgot Password"
          : step === "otp"
            ? "Verify OTP"
            : "Reset Password"}
      </Typography>
      <Typography align="center" variant="body2" mb={3}>
        {step === "email"
          ? "Enter your email to receive an OTP."
          : step === "otp"
            ? "Enter the 6-digit OTP sent to your email."
            : "Create a new password for your account."}
      </Typography>

      {step === "email" && renderEmailForm()}
      {step === "otp" && renderOtpForm()}
      {step === "reset" && renderResetForm()}

      {step !== "reset" && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Typography variant="body2">Remember your password?</Typography>
          <Button
            onClick={switchToLogin}
            size="small"
            sx={{ ml: 1, color: "#00281c" }}
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Box>
      )}
    </Box>
  );
}

