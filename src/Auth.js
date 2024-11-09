import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button } from "@mui/material";
import { Mail, Facebook, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logEvent } from "./analytics";
import FreeAccountBenefitsList from "./components/FreeAccountBenefits";

const Auth = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Add your email authentication logic here
    logEvent("Auth", "SignInAttempt", "email");
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        // minHeight: "100vh",
        // width: "100%",
        // maxWidth: "100vh",
        // overflowX: "hidden",
        // backgroundColor: "background.default",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // pt: 4,
        // px: 2,
        // m: "auto",
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
            width: "95%",
            p: 4,
            backgroundColor: "white",
          }}
        >
          {/* Title */}
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

          {/* Benefits List */}
          <FreeAccountBenefitsList />

          {/* Magic Code Message */}
          {/* <Typography
            sx={{
              mb: 3,
              textAlign: "center",
              width: "100%",
              maxWidth: 360,
            }}
          >
            No password needed! We'll send a ✨magic✨ code to your e-mail.
          </Typography> */}

          {/* Email Form */}
          <Box
            component="form"
            onSubmit={handleEmailSubmit}
            sx={{
              width: "100%",
              maxWidth: 360,
              mb: 2,
              backgroundColor: "white",
              borderRadius: 2,
              p: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              startIcon={<Mail />}
              sx={{
                py: 1.5,
              }}
            >
              SIGN IN WITH EMAIL
            </Button>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            py: 2,
            textAlign: "center",
          }}
        >
          <Typography sx={{ mb: 1 }}>
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
