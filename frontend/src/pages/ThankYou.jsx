import { Container, Typography } from "@mui/material";

const ThankYou = () => {
  return (
    <Container>
      <Typography variant="h2" className="text-center my-12">
        Thank You!
      </Typography>
      <div className="max-w-md mx-auto text-center">
        <Typography variant="body1">
          Your order has been placed successfully. Thank you for shopping with
          us!
        </Typography>
      </div>
    </Container>
  );
};

export default ThankYou;
