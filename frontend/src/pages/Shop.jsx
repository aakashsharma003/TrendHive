import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import ProductElement from "../components/ProductElement";
import { Server } from "../main";
import Search from "./Search";
import FilterSidebar from "../components/FilterSidebar"; // Import the FilterSidebar component

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axios.get(`${Server}/products`),
          axios.get(`${Server}/categories`),
        ]);
        setProducts(productResponse.data.products);
        setCategories(categoryResponse.data.categories);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = (selectedCategories) => {
    // Handle filter logic here
    console.log("Selected categories:", selectedCategories);
    // You can filter the products based on selected categories and update the products state
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "#7e22ce" }} />
        </div>
      )}
      {!loading && (
        <Container>
          <Typography
            variant="h2"
            className="text-center mb-14 text-[2.5rem] space-x-[0.6rem]"
          >
            All Products
          </Typography>
          <Search />

          <Grid container spacing={3} sx={{ marginTop: "1rem" }}>
            <Grid item xs={12} sm={3}>
              {!loading && (
                <FilterSidebar
                  categories={categories}
                  applyFilters={applyFilters}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                    <ProductElement
                      id={product._id}
                      title={product.title}
                      image={"/shop.jpg"}
                      rating={product.rating}
                      price={product.price}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Shop;
