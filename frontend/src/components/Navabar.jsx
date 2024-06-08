import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    toast.success("Logged out successfully.");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Store", link: "/shop" },
    { text: "About Us", link: "/about-us" },
    { text: "Contact Us", link: "/contact" },
  ];

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between bg-purple-700">
        <div className="md:hidden">
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <div
              className="w-64"
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    component={Link}
                    to={item.link}
                    key={item.text}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
                {isLoggedIn ? (
                  <>
                    <ListItem button component={Link} to="/user-profile">
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/cart">
                      <ListItemText primary="Cart" />
                    </ListItem>
                    <ListItem button component={Link} to="/orders">
                      <ListItemText primary="Orders" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
                ) : (
                  <ListItem button component={Link} to="/login">
                    <ListItemText primary="Login" />
                  </ListItem>
                )}
              </List>
            </div>
          </Drawer>
        </div>
        <Typography variant="h6" className="hidden md:block cursor-pointer">
          TrendHive
        </Typography>
        <div className="hidden md:flex">
          {menuItems.map((item) => (
            <Button
              color="inherit"
              component={Link}
              to={item.link}
              key={item.text}
            >
              {item.text}
            </Button>
          ))}

          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleAvatarClick}>
                <Avatar />
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  component={Link}
                  to="/user-profile"
                  onClick={handleCloseMenu}
                >
                  Profile
                </MenuItem>
                <MenuItem component={Link} to="/cart" onClick={handleCloseMenu}>
                  Cart
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/orders"
                  onClick={handleCloseMenu}
                >
                  Orders
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </div>
        <Typography variant="h6" className="md:hidden cursor-pointer">
          TrendHive
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
