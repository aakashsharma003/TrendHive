// src/components/Services.js

import { Container, Grid, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import "../styles/Services.css"; // Assuming you are using a CSS file

const services = [
  {
    title: "Free Shipping",
    description: "We offer free shipping on all orders above $50.",
    icon: <LocalShippingIcon style={{ fontSize: 50 }} />,
  },
  {
    title: "24/7 Support",
    description: "Our customer support is available 24/7 to assist you.",
    icon: <SupportAgentIcon style={{ fontSize: 50 }} />,
  },
  {
    title: "Money-Back Guarantee",
    description: "30 days money-back guarantee on all products.",
    icon: <MonetizationOnIcon style={{ fontSize: 50 }} />,
  },
];

const Services = () => {
  return (
    <div className="fullWidth bg-slate-200 py-[1rem]">
      <Typography
        variant="h2"
        className="text-center mb-14 text-[2.5rem] space-x-[0.6rem]"
      >
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <div className="text-center p-10">
              <div>{service.icon}</div>
              <Typography variant="h5" className="font-bold mt-4">
                {service.title}
              </Typography>
              <Typography variant="body1" className="mt-2">
                {service.description}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Services;
