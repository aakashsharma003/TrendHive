import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import "../styles/ProductElement.css";

const ProductElement = ({ id, title, image, rating, price }) => {
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductElement;
