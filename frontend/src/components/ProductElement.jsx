import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../styles/ProductElement.css";

const ProductElement = ({
  id,
  title,
  image,
  rating,
  price,
  addToCartHandler,
  addToWishlistHandler,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="product-card">
      <CardActionArea onClick={() => navigate(`/shop/product/${id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          className="product-image"
        />
        <CardContent className="product-content">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
          <Typography variant="body2" color="textSecondary">
            ${price}
          </Typography>
          <div className="product-icons">
            <IconButton
              aria-label="add to cart"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                addToCartHandler(id);
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              aria-label="add to wishlist"
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                addToWishlistHandler(id);
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductElement;
