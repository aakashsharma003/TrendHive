import { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Server } from "../main";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${Server}/auth/signup`,
        {},
        {
          headers: {
            name,
            email,
            password,
            phoneNo,
            address,
          },
        }
      );
      const { token, user, message } = response.data;

      // Store token and user details locally (e.g., in local storage)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(message);
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed. Please try again.");
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
          Register
        </Typography>
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <TextField
            label="Name"
            fullWidth
            type={"text"}
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={"required"}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            required={"required"}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={"required"}
          />
          <TextField
            label="Mobile no"
            type="tel"
            fullWidth
            margin="normal"
            value={phoneNo}
            required={"required"}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            required={"required"}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="mt-4 w-full"
            type={"submit"}
          >
            Register
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Login here
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
