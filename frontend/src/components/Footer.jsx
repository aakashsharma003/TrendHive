// src/components/Footer.js

import { Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <Container>
        <Typography variant="body1" className="text-center">
          &copy; {new Date().getFullYear()} TrendHive. All rights reserved.
        </Typography>
        <Typography variant="body2" className="text-center mt-2">
          <Link href="/privacy-policy" color="inherit">
            Privacy Policy
          </Link>
          {" | "}
          <Link href="/terms-of-service" color="inherit">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
