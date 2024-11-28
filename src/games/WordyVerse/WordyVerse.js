import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import TopicsBody from "./TopicsBody";
import { useStytchUser } from "@stytch/react";
import LoginButtons from "./SignupButton";

const WordyVerse = () => {
  const theme = useTheme();
  const { user } = useStytchUser();

  // Function to check if a game should be locked
  const isGameLocked = (gameDate) => {
    if (user) return false; // Always unlocked for logged-in users

    const currentDate = new Date();
    const gameDateTime = new Date(gameDate);
    const differenceInTime = currentDate.getTime() - gameDateTime.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays > 7;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: 'background.default',
      }}
    >
      <Helmet>
        <title>Wordy Verse</title>
        <meta
          name="description"
          content="Enjoy engaging online puzzle games, word games, and casual games similar to NYT Games. Challenge yourself with our collection of brain teasers and addictive puzzles."
        />
      </Helmet>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          py: { xs: 2, sm: 3, md: 4 },
          maxWidth: "600px",
          mx: 'auto',
          boxSizing: "border-box",
        }}
      >
        <Box>

        <Typography
            sx={{
              fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Welcome to the
          </Typography>

          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
              textAlign: 'center',
              fontWeight: 900,
            }}
          >
            Wordy-verse!
          </Typography>
        </Box>

        {/* {!user && <LoginButtons />} */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <TopicsBody isGameLocked={isGameLocked} isLoggedIn={!!user} />
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Flying Comet Games. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default WordyVerse;