import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Button } from "@mui/material";
import { Server } from "../main";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get(`${Server}/wishlist`);
        setWishlistItems(response.data);
      } catch (err) {
        setError("Failed to fetch wishlist items");
      }
    };

    fetchWishlistItems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Typography variant="h2" className="text-center my-12">
        Your Wishlist
      </Typography>
      <Grid container spacing={3}>
        {wishlistItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <div className="border p-4">
              <img src={item.imageUrl} alt={item.name} className="w-full" />
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="h5" className="my-2">
                ${item.price.current.value}
              </Typography>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
              <Button variant="contained" color="secondary" className="ml-2">
                Remove
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist;
