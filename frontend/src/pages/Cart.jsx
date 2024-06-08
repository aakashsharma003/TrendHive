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
  const handleRemove = async () => {
    try {
      const res = await axios.delete(`${Server}`);
    } catch (err) {}
  };
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
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <div className="border p-4">
              <img
                src={"/shop.jpg"}
                alt={item.product._id}
                className="w-full"
              />
              <Typography variant="h6">{item.product.title}</Typography>
              <Typography variant="body1">Quantity: {item.quantity}</Typography>
              <Typography variant="h5" className="my-2">
                ${item.product.price}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRemove}
              >
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
