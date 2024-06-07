// src/components/CustomerReviews.js

import { Container, Grid, Typography, Avatar } from "@mui/material";

const reviews = [
  {
    name: "John Doe",
    review: "Great products and fantastic service!",
    avatar: "/images/avatar1.png",
  },
  {
    name: "Jane Smith",
    review: "I love the variety and quality of the items.",
    avatar: "/images/avatar2.png",
  },
  {
    name: "Mark Wilson",
    review: "Fast shipping and excellent customer support.",
    avatar: "/images/avatar3.png",
  },
];

const CustomerReviews = () => {
  return (
    <Container className="my-12">
      <Typography variant="h2" className="text-center mb-12">
        Customer Reviews
      </Typography>
      <Grid container spacing={4}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <div className="text-center">
              <Avatar
                alt={review.name}
                src={review.avatar}
                sx={{ width: 64, height: 64, margin: "auto" }}
              />
              <Typography variant="h6" className="mt-4">
                {review.name}
              </Typography>
              <Typography variant="body1" className="mt-2">
                {review.review}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CustomerReviews;
