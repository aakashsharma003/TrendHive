import { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductElement from "../components/ProductElement";
import { Server } from "../main";

const Search = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${Server}/products?q=${query}`);
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  return (
    <Container>
      <div
        className={
          isSmallScreen ? "flex flex-col" : "flex justify-between w-full"
        }
      >
        <TextField
          label="Search"
          fullWidth
          margin="normal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className={isSmallScreen ? "mt-10 w-full" : "mt-10"}
          sx={{ margin: "15px 2px" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <Grid container spacing={3} className="mt-12">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductElement
              id={product.id}
              title={product.name}
              image={product.imageUrl}
              rating={product.rating}
              price={product.price.current.value}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;
