import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { getStreakFromStorage } from "./StreakUtil";
import SignupButton from "../games/WordyVerse/SignupButton";

const StreakCounter = ({
  streak = getStreakFromStorage()["count"],
  isLoggedIn = false,
}) => {
  return (
    <Box>
      {isLoggedIn ? (
        <Tooltip title="Your current streak!">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "4px 8px",
              borderRadius: "4px",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <span role="img" aria-label="fire">
              🔥
            </span>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              {streak}
            </Typography>
          </Box>
        </Tooltip>
      ) : (
        <SignupButton
          includeIcon={false}
          buttonText="Log In"
          buttonStyles={{
            textTransform: "none",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "1px",
            paddingBottom: "1px",
          }}
        />
      )}
    </Box>
  );
};

export default StreakCounter;
