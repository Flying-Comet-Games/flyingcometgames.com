import React from "react";
import { Box, Button } from "@mui/material";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStytchUser } from "@stytch/react";

const SignupButton = ({ buttonText = "Create a free account!", includeIcon = true, containerStyles = {}, buttonStyles = {} }) => {
  const navigate = useNavigate();
  const { user } = useStytchUser();

  const handleSignUpClick = () => {
    navigate("/wordy-verse/auth");
  };

  // Don't render the button if user is already logged in
  if (user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        ...containerStyles,
      }}
    >
      <Button
        variant="contained"
        startIcon={includeIcon ? <User /> : undefined}
        onClick={handleSignUpClick}
        sx={{
          width: "100%",
          fontWeight: 600,
          borderRadius: 20,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
          ...buttonStyles,
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default SignupButton;