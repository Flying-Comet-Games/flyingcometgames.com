import React from "react";
import KofiButton from "./KofiButton";
import { Box, Typography, Container, Link as MuiLink } from "@mui/material";
import { Bold, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const AboutUs = ({ isComponent = false }) => {
  return (
    <Container
      maxWidth="100%"
      sx={{
        textAlign: "center",
        p: 2,
        ...(!isComponent && {
          backgroundColor: "background.default",
          minHeight: "100vh",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background.svg)`,
          backgroundRepeat: "no-repeat repeat",
          backgroundSize: "auto",
          backgroundPosition: "center 40px",
        }),
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            width: "100%",
          }}
        >
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/icons/star-bullet.svg`}
            alt="Star Bullet"
            sx={{ width: "20px", height: "20px" }}
          />
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: "bold",
            }}
          >
            About Us
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          We’re friends Calli & Eden, the humans behind Flying Comet Games. We
          make guilt-free games for clever minds to enjoy daily. In a world of
          doomscrolling and distractions, we want to offer quick wholesome fun
          you can share with friends, family and community members.
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
      </Box>
      {!isComponent && <Footer />}
    </Container>
  );
};

export default AboutUs;
