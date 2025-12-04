import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterUserForm from "./Register";
import LoginUserForm from "./Login";
import ForgotPasswordForm from "./ForgotPasswordForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "transparent",
  boxShadow: 24,
  p: 2,
};

export default function AuthModal({ handleClose, open }) {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [formState, setFormState] = useState("login"); // 'login' | 'register' | 'forgot'

  useEffect(() => {
    if (auth.user) {
      handleClose();
      if (auth.user?.role === "ADMIN") {
        navigate("/admin");
      }
    }
  }, [auth.user]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box className="rounded-md" sx={style}>
        {formState === "login" && (
          <LoginUserForm
            switchToRegister={() => setFormState("register")}
            switchToForgot={() => setFormState("forgot")}
          />
        )}
        {formState === "register" && (
          <RegisterUserForm switchToLogin={() => setFormState("login")} />
        )}
        {formState === "forgot" && (
          <ForgotPasswordForm switchToLogin={() => setFormState("login")} />
        )}
      </Box>
    </Modal>
  );
}
