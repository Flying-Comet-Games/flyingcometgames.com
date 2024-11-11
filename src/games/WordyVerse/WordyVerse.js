import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; // Added Button import
import PersonIcon from "@mui/icons-material/Person"; // Added PersonIcon import
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import TopicsBody from "./TopicsBody";
import WordyVerseToolbar from "./Toolbar";
import LoginButtons from "./SignupButton";

const WordyVerse = () => {
  const theme = useTheme();

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
          maxWidth: "1024px",
          mx: 'auto',
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            textAlign: "left",
            mb: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              pb: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            Ultra-niche word puzzles for super fans, inside jokes, and subject matter experts.
          </Typography>
        </Box>

        <LoginButtons />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <TopicsBody />
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
