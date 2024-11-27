import React from "react";
import KofiButton from "./KofiButton";
import { Box, Typography, Container, Link as MuiLink } from "@mui/material";
import { Bold, X } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <Container
      maxWidth="100%"
      sx={{
        minHeight: "100vh",
        textAlign: "center",
        p: 2,
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
          {/* <img
            src={`${process.env.PUBLIC_URL}/assets/icons/wordy-verse-icon.svg`}
            alt="Wordy-verse Logo"
            style={{ width: 64, height: 64 }}
          /> */}
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: "bold",
              mx: "auto"
            }}
          >
            About Us
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", textAlign: "left" }}
        >
        We’re friends Calli & Eden, the humans behind Flying Comet Games. We make guilt-free games for clever minds to enjoy daily.
        In a world of doomscrolling and distractions, we want to offer quick wholesome fun you can share with friends, family and community members.

        </Typography>

        <Typography variant="h6" sx={{ textAlign: "left" }}>
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

        <KofiButton />

      </Box>
    </Container>
  );
};

export default AboutUs;
