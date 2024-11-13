import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InfoIcon from "@mui/icons-material/Info";
import SecurityIcon from "@mui/icons-material/Security";
import DescriptionIcon from "@mui/icons-material/Description";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStytch, useStytchUser } from "@stytch/react";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const WordyVerseToolbar = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const stytch = useStytch();
  const { user } = useStytchUser();
  const navigate = useNavigate();

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
    { text: "Topics", icon: <SportsEsportsIcon />, path: "/wordy-verse" },
    // { text: 'Groups', icon: <GroupIcon />, path: '/groups' },
    // { text: 'Leaderboards', icon: <EmojiEventsIcon />, path: '/leaderboards' },
    // { text: 'Collect', icon: <CheckBoxIcon />, path: '/collect' },
  ];

  const bottomMenuItems = [
    { text: "About Us", icon: <InfoIcon />, path: "/wordy-verse/about" },
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
        <ListItem
          button
          onClick={() => {
            if (user) {
              stytch.session.revoke();
            } else {
              navigate("/wordy-verse/auth");
            }
          }}
          sx={{
            py: 2,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            {user ? <LogoutIcon /> : <LoginIcon />}
          </ListItemIcon>
          <ListItemText primary={user ? "Sign Out" : "Sign In"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ borderBottom: "1px solid black" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar
          sx={{ backgroundColor: "#e0dfd9", justifyContent: "space-between" }}
        >
          <Box
            component={Link}
            to="/wordy-verse"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/game-logos/wordy-verse-logo-name.svg`}
              alt="Flying Comet Games Logo"
              style={{ height: "30px", marginRight: "10px" }}
            />
          </Box>

          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default WordyVerseToolbar;
