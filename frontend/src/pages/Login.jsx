import { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Server } from "../main";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Server}/auth/signin`, {
        email,
        password,
      });
      const { token, user, message } = response.data;

      // Store token and user details locally (e.g., in local storage)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);

      toast.success(message);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            style={{ marginTop: "16px" }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Register here
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
