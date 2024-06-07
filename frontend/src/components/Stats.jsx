import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";

const Stats = () => {
  const [productCount, setProductCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const incrementValue = (target, setState) => {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 10);

      const countUp = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(countUp);
          setState(target);
        } else {
          setState(Math.ceil(start));
        }
      }, 10);
    };

    incrementValue(1000, setProductCount);
    incrementValue(500, setBrandCount);
    incrementValue(2000, setCustomerCount);
  }, []);

  return (
    <section className="py-20 bg-red-100">
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <div className="text-center">
              <Typography variant="h3" className="font-bold">
                {productCount}+
              </Typography>
              <Typography variant="h6">Products</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="text-center">
              <Typography variant="h3" className="font-bold">
                {brandCount}+
              </Typography>
              <Typography variant="h6">Brands</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="text-center">
              <Typography variant="h3" className="font-bold">
                {customerCount}+
              </Typography>
              <Typography variant="h6">Happy Customers</Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Stats;
