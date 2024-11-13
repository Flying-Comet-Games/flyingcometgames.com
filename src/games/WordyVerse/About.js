import React from "react";
import { Box, Typography, Container, Link as MuiLink } from "@mui/material";
import { Bold, X } from "lucide-react";
import { Link } from "react-router-dom";

const WordyVerseAbout = () => {
  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          maxWidth: "sm",
          mx: "auto",
          p: 4,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          backgroundColor: "background.default",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/wordy-verse-icon.svg`}
            alt="Wordy-verse Logo"
            style={{ width: 64, height: 64 }}
          />
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: "bold",
            }}
          >
            About Wordy-verse
          </Typography>
        </Box>

        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Hi, we're Calli & Eden the creators of the Wordy-verse.
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          We make guilt-free games about your favorite things. In a world of
          doomscrolling and distractions, we want to offer quick wholesome fun
          you can share with friends, fellow fans and community members.
        </Typography>

        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Thanks for joining the fun! ✨
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/avatars/calli.png`}
            alt="Calli's avatar"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/avatars/eden.png`}
            alt="Eden's avatar"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
        </Box>

        <MuiLink
          href="mailto:calli@flyingcometgames.com"
          sx={{
            textDecoration: "underline",
            color: "inherit",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          Have feedback for us?
        </MuiLink>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 4 }}>
          <Typography fontWeight="bold">
            Made with ❤️ by{" "}
            <MuiLink
              href="https://flyingcometgames.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: "underline",
                color: "inherit",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              Flying Comet Games
            </MuiLink> in Oakland, CA.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default WordyVerseAbout;
