import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Server } from "../main";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${Server}/orders`);
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Typography variant="h2" className="text-center my-12">
        Order History
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography variant="body1">Date: {order.date}</Typography>
                <Typography variant="body1">Total: ${order.total}</Typography>
                <Typography variant="body1">Status: {order.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OrderHistory;
