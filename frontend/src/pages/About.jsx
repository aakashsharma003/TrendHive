import { Container, Typography } from "@mui/material";
import "../styles/About.css"; // Ensure you create this CSS file

const About = () => {
  return (
    <div className="about-container text-white">
      <Container className="relative z-10 flex justify-center items-center text-center">
        <div className="text-content">
          <Typography variant="h2" className="about-title">
            About Us
          </Typography>
          <Typography variant="body1" className="about-description text-lg">
            Welcome to our e-commerce store! We are committed to providing you
            with the best products and services.
          </Typography>
          <Typography variant="body2" className="about-description text-2xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum ex
            quo ratione sit dolorum maiores facere quam animi earum obcaecati
            repellat, rerum mollitia aliquam nisi error excepturi. Natus vitae
            similique nesciunt necessitatibus est cumque eum fugiat corrupti
            itaque, modi repudiandae aliquam beatae saepe libero ut amet culpa
            nulla illo, laboriosam esse optio, totam officia sit minima.
            Deleniti atque voluptas eum ipsam, vitae laboriosam quisquam nostrum
            excepturi illum deserunt neque quibusdam!
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default About;
