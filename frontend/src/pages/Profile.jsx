import {
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <Container
      sx={{
        bgcolor: "#cc8de5",
        height: "100vh",
        maxWidth: "100vw",
        padding: "2rem",
        color: "#323233",
      }}
    >
      <Typography
        variant="h2"
        className="text-center mb-10 text-[2.5rem] md:text-[2rem] space-x-[0.2rem]"
      >
        User Profile
      </Typography>
      <Grid container spacing={3}>
        {/* Left side: User avatar */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={userInfo.name}
            src={userInfo.avatar}
            sx={{ width: 200, height: 200 }}
          />
        </Grid>
        {/* Right side: User information */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {userInfo.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {userInfo.email}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Phone Number: {userInfo.phone_number}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Address: {userInfo.address}
          </Typography>
        </Grid>
      </Grid>
      {/* Cards for orders, cart, wishlist, and reviews */}
      <Grid container spacing={3}>
        {/* Card for Orders */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Orders
              </Typography>
              {/* Display orders here */}
            </CardContent>
          </Card>
        </Grid>
        {/* Add similar cards for Cart, Wishlist, and Reviews */}
        {/* For example: */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Cart
              </Typography>
              Display cart items here
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Wishlist
              </Typography>
              Display cart items here
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Reviews
              </Typography>
              Display cart items here
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
