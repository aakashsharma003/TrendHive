import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Button } from "@mui/material";
import "../index.css"; // Make sure Tailwind CSS is imported
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import ProductElement from "../components/ProductElement";
import { Server } from "../main";
import Services from "../components/Services";
import OurPartners from "../components/OurPartners";
import Footer from "../components/Footer";

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${Server}/products`);
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedProducts = viewAll ? products : products.slice(0, 6);

  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <div className="bg-red-100 w-full p-10">
        <Typography variant="h2" className="text-center mb-12">
          Trending Products
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {displayedProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductElement
                id={product._id}
                title={product.title}
                image={"/Shop.jpg"}
                rating={product.rating}
                price={product.price}
              />
            </Grid>
          ))}
        </Grid>
        <div className="text-center mt-8">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "View All"}
          </Button>
        </div>
      </div>
      <OurPartners />
      <Footer />
    </main>
  );
};

export default Landing;
