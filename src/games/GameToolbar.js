import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import SecurityIcon from "@mui/icons-material/Security";
import DescriptionIcon from "@mui/icons-material/Description";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useStytchUser } from "@stytch/react";
import StreakCounter from "../components/StreakCounter";
import AuthListItem from "../components/AuthListItem";

const GameToolbar = ({
  basePath,
  backgroundColor = "#f4f0df",
  menuItems = [
    {
      text: "Home",
      icon: `${process.env.PUBLIC_URL}/assets/logo.svg`,
      path: "/",
    },
    {
      text: "Wordy-verse",
      icon: `${process.env.PUBLIC_URL}/assets/icons/wordy-verse-icon2.svg`,
      path: "/wordy-verse",
    },
    {
      text: "Trivia Roundup",
      icon: `${process.env.PUBLIC_URL}/assets/icons/trivia-roundup-icon.svg`,
      path: "/trivia-roundup/seattle",
    },
  ],
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useStytchUser();

  const handleKofiClick = () => {
    window.open("https://ko-fi.com/V7V2162LVY", "_blank");
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

  const bottomMenuItems = [
    { text: "About Us", icon: <InfoIcon />, path: "/about" },
    { text: "Privacy Policy", icon: <SecurityIcon />, path: "/privacy" },
    { text: "Terms of Use", icon: <DescriptionIcon />, path: "/terms" },
    { text: "Send Feedback", icon: <FeedbackIcon />, path: "/feedback" },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        component="a"
        href="https://docs.google.com/forms/d/e/1FAIpQLSeYUR5M-y0ys8IYcgHAp2duNV-RphHx9h82TWCmY-5zEYoKSA/viewform"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "block",
          width: "100%",
          cursor: "pointer",
          transition: "transform 0.2s ease, opacity 0.2s ease",
          paddingRight: 0.5,
          paddingTop: 1,
          "&:hover": {
            transform: "scale(1.02)",
            opacity: 0.9,
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/wordy-topics/request-a-topic.svg`}
          alt="Request a topic"
          style={{
            width: "100%",
            display: "block",
          }}
        />
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={`${item.path}`}
            sx={{
              py: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <img
                src={item.icon}
                alt={item.title}
                style={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <List sx={{ mt: "auto" }}>
        {bottomMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              py: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        <AuthListItem />
        <Divider />

        <Box sx={{ p: 1 }}>
          <Box
            onClick={handleKofiClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              backgroundColor: "#B8C26C",
              color: "white",
              padding: "12px 24px",
              borderRadius: "100px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.02)",
                opacity: 0.9,
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            <img
              src={`https://storage.ko-fi.com/cdn/logomarkLogo.png`}
              alt="Ko-fi"
              style={{
                height: "20px",
                width: "auto",
              }}
            />
            <span
              style={{
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              Support our games!
            </span>
          </Box>
        </Box>
      </List>
    </Box>
  );
  return (
    <Box sx={{ borderBottom: "1px solid black" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ backgroundColor, justifyContent: "space-between" }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo-vertical.svg`}
              alt={`Flying Comet Games Logo`}
              style={{ height: "45px", marginRight: "10px" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StreakCounter isLoggedIn={user} />

            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ ml: "1px" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default GameToolbar;
