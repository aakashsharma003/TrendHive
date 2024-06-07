import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  CssBaseline,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  ListAlt as ListAltIcon,
  Menu as MenuIcon, // Import the Menu icon for the hamburger button
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { Server } from "../main";
import { toast } from "react-toastify";

const drawerWidth = 240;

const AdminDashboard = () => {
  const [products, setProducts] = useState([
    {
      _id: "1",
      title: "Sample Product 1",
      price: 29.99,
      description: "This is a sample product description.",
      imageUrl: "/shop.jpg",
      stock_quantity: 10,
      rating: 4.5,
    },
    {
      _id: "2",
      title: "Sample Product 2",
      price: 19.99,
      description: "This is another sample product description.",
      imageUrl: "/shop.jpg",
      stock_quantity: 15,
      rating: 4.0,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
    stock_quantity: "",
    rating: "",
    category_id: "", // Initialize category_id here
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${Server}/products`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${Server}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`${Server}/products/${id}`);
      toast.success(resp.data.message);
      fetchProducts();
    } catch (error) {
      toast.error("Deletion Failed Pls try again..!");
      console.error("Error deleting product:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const resp = await axios.post(`${Server}/products`, newProduct);
      toast.success(resp.data.message);
      fetchProducts();
      handleClose();
    } catch (error) {
      toast.error("Product addition failed!");
      console.error("Error adding product:", error);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box
      sx={{ overflow: "auto", bgcolor: "rgb(192,132,252)", height: "100vh" }}
    >
      <List>
        {["Profile", "Products", "Users", "Orders"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgb(126,34,206)",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton onClick={handleAvatarClick}>
            <Avatar alt="Admin" src="/admin-avatar.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, marginLeft: 0, padding: "2rem" }}
      >
        <Toolbar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add Product
          </Button>
          <Grid container spacing={3} className="my-4">
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={"/shop.jpg"}
                    alt={product._id}
                    className="product-image"
                  />
                  <CardContent>
                    <Typography variant="h5">{product.title}</Typography>
                    <Typography>${product.price}</Typography>
                    <Typography>{product.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => handleDelete(product._id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      //   onClick={() => handleDelete(product._id)}
                      color="secondary"
                    >
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            sx={{ overflowY: "auto" }}
          >
            <DialogTitle>Add New Product</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    value={newProduct.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    value={newProduct.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={newProduct.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="imageUrl"
                    label="Image URL"
                    type="text"
                    fullWidth
                    value={newProduct.imageUrl}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="stock_quantity"
                    label="Stock Quantity"
                    type="number"
                    fullWidth
                    value={newProduct.stock_quantity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="rating"
                    label="Rating"
                    type="number"
                    fullWidth
                    value={newProduct.rating}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category_id"
                      value={newProduct.category_id}
                      onChange={handleChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
