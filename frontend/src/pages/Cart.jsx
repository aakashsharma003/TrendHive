import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Button } from "@mui/material";
import { Server } from "../main";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // console.log(localStorage.getItem("userId"));
    const fetchCartItems = async () => {
      try {
        // setUserId();
        const response = await axios.get(`${Server}/cart/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCartItems(response.data.cart);
      } catch (err) {
        setError("Failed to fetch cart items");
      }
    };

    fetchCartItems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Typography variant="h2" className="text-center my-12">
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <div className="border p-4">
              <img src={item.imageUrl} alt={item.name} className="w-full" />
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">Quantity: {item.quantity}</Typography>
              <Typography variant="h5" className="my-2">
                ${item.price.current.value}
              </Typography>
              <Button variant="contained" color="secondary">
                Remove
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cart;
