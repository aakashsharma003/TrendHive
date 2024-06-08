import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Button,
  Rating,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  IconButton,
  TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Server } from "../main";
import { toast } from "react-toastify";
const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${Server}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = async () => {
    try {
      const res = await axios.post(
        `${Server}/cart/${userId}`,
        {
          productId: id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log("Product added to cart:", res.data);
      toast.success(res.data.message);
    } catch (err) {
      toast.error("adding to cart failed");
      console.error("Error adding product to cart:", err);
    }
  };

  const addToWishlistHandler = async () => {
    try {
      const res = await axios.post(
        `${Server}/wishlist/${userId}`,
        {
          productId: id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Product added to wishlist:", res.data);
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Adding to wishlist failed!");
      console.error("Error adding product to wishlist:", err);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      return newQuantity > 0 ? newQuantity : 1; // Ensure quantity is always at least 1
    });
  };

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={"/shop.jpg"} alt={product.title} className="w-full" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h2">{product.title}</Typography>
          <Rating value={product.rating} readOnly />
          <Typography variant="h4" className="my-4">
            Price: Rs {product.price}
          </Typography>
          <Typography variant="h4" className="my-4">
            Available: {product.stock_quantity}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Box className="mt-4" display="flex" alignItems="center">
            <IconButton onClick={() => handleQuantityChange(-1)}>
              <RemoveIcon />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              type="number"
              inputProps={{ min: 1 }}
              style={{ width: "55px", textAlign: "center" }}
            />
            <IconButton onClick={() => handleQuantityChange(1)}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box className="mt-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FavoriteIcon />}
              onClick={addToWishlistHandler}
              className="ml-4"
            >
              Add to Wishlist
            </Button>
          </Box>
          <Box className="mt-4">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h4" className="my-4">
          Reviews
        </Typography>
        {product.reviews && product.reviews.length > 0 ? (
          <Grid container spacing={3}>
            {product.reviews.map((review, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar>{review.user[0]}</Avatar>
                      <Typography variant="h6" className="ml-2">
                        {review.user}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body1">{review.comment}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No reviews yet.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default SingleProduct;
