import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FreeAccountBenefitsList from "./components/FreeAccountBenefits";
import { useStytch } from "@stytch/react";
import Login from "./utilities/LoginForm";

const Auth = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const stytch = useStytch();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send magic link email
      await stytch.magicLinks.email.loginOrSignup({
        email: email,
        login_magic_link_url: `${window.location.origin}/authenticate`,
        signup_magic_link_url: `${window.location.origin}/authenticate`,
      });

      // Show success message or redirect to check-email page
      // You might want to navigate to a "check your email" page
      navigate("/wordy-verse/check-email");
    } catch (error) {
      console.error("Authentication error:", error);
      // Handle error appropriately
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100vh",
          overflowX: "hidden",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
          px: 2,
          m: "auto",
        }}
      >
        <Box
          sx={{
            p: 4,
            border: "1px solid black",
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Create your free account
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: ".75rem", sm: "1rem", md: "1rem" },
              mb: 3,
              textAlign: "center",
            }}
          >
            Get access to all Flying Comet Games.
          </Typography>

          <FreeAccountBenefitsList />

          <Typography
            sx={{
              mb: 3,
              textAlign: "center",
              width: "100%",
              maxWidth: 360,
            }}
          >
            We'll send you a <br/> ✨ magic ✨ link to sign in
          </Typography>

          <Login />

        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            py: 2,
            textAlign: "center",
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: "bold" }}>
            Made with ❤️ by{" "}
            <Link
              to="https://flyingcometgames.com"
              style={{
                color: "inherit",
                textDecoration: "underline",
              }}
            >
              Flying Comet Games
            </Link>
          </Typography>
          <Typography>
            Explore more of our puzzle games{" "}
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "underline",
              }}
            >
              here
            </Link>
            !
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;