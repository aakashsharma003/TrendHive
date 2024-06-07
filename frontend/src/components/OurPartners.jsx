import { Container, Grid, Typography } from "@mui/material";
import "../styles/OurPartners.css"; // Import the CSS file

const partners = [
  "/partner1.png",
  "/partner2.png",
  "/partner3.png",
  "/partner4.png",
];

const OurPartners = () => {
  return (
    <div className="p-10 bg-[#faebd7]">
      <Typography
        variant="h2"
        className="text-center mb-14 text-[2.5rem] space-x-[0.6rem] md:text-[1rem]"
      >
        Our Partners
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {partners.map((partner, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className="text-center partner-logo">
              <img src={partner} alt={`Partner ${index + 1}`} />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OurPartners;
