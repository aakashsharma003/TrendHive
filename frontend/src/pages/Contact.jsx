import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Server } from "../main";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContact = async () => {
    try {
      await axios.post(`${Server}/contact`, {
        name,
        email,
        message,
      });
      // Handle successful contact submission
    } catch (err) {
      // Handle contact submission error
    }
  };

  return (
    <Container>
      <Typography variant="h2" className="text-center my-12">
        Contact Us
      </Typography>
      <form className="max-w-md mx-auto">
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Message"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleContact}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Contact;
