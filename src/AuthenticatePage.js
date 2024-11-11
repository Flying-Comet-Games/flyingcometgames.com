import React, { useEffect, useState } from "react";
import { useStytch, useStytchUser } from "@stytch/react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

const AuthenticatePage = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      // If already authenticated, redirect to main page
      if (user) {
        navigate("/wordy-verse");
        return;
      }

      // If stytch SDK is available, check for token
      if (stytch) {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        const tokenType = queryParams.get("stytch_token_type");

        if (token && tokenType) {
          try {
            if (tokenType === "magic_links") {
              await stytch.magicLinks.authenticate(token, {
                session_duration_minutes: 60,
              });
              navigate("/wordy-verse");
            } else if (tokenType === "oauth") {
              await stytch.oauth.authenticate(token, {
                session_duration_minutes: 60,
              });
              navigate("/wordy-verse");
            }
          } catch (err) {
            setError("Authentication failed. Please try logging in again.");
          }
        } else {
          setError("Invalid authentication link.");
        }
      }
    };

    authenticate();
  }, [stytch, user, navigate]);

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: 2,
        }}
      >
        <Typography color="error">{error}</Typography>
        <Typography
          onClick={() => navigate("/wordy-verse")}
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
            "&:hover": { opacity: 0.8 }
          }}
        >
          Return to main page
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default AuthenticatePage;