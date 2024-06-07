import { Container, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className=" bg-purple-400 text-white py-20">
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <div>
              <Typography
                variant="h2"
                component="h1"
                className="mb-4 text-[1.6rem] space-x-[0.15rem]"
              >
                Welcome to Our E-commerce Store
              </Typography>
              <Typography variant="h5" component="p" className="mb-8">
                Discover the best products at amazing prices!
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="/poster.png"
              alt="E-commerce Store"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Hero;
