import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FeaturedMobileGame from "./FeaturedMobileGame";
import GameButton from "./GameButton";
import CollapsibleSEOContent from "./CollapsibleSEOContent";
import GamesBody from "./GamesBody";
import { Helmet } from "react-helmet";
import { Assessment } from "@mui/icons-material";
import AssSeenInSection from "./AsSeenIn";
import AsSeenInSection from "./AsSeenIn";
import WhyGames from "./WhyGames";
import CTAButtons from "./CTAButtons";
import Testimonials from "./Testimonials";
import WorkWithUs from "./WorkWithUs";
import AboutUs from "./About";

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: theme.palette.background.default,
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background.svg)`,
        backgroundRepeat: "no-repeat repeat", // Prevents horizontal repeat but allows vertical repeat
        backgroundSize: "auto", // Keeps the image's original size
        backgroundPosition: "center 40px", // Adds padding (10px from top and left)
      }}
    >
      <Helmet>
        <title>
          Online Puzzle Games | Flying Comet Games - NYT Games Alternative
        </title>
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
          width: "100%",
          maxWidth: "100%", // Ensure container does not exceed screen width
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
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Feel-good games for local{" "}
            <span style={{ textDecoration: "underline" }}>digital</span>{" "}
            publications.
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.25rem", md: "1.5rem" },
              pb: 2,
              fontWeight: 400,
            }}
          >
            Boost engagement and retention with games that become part of your
            readers’ daily routine.
          </Typography>
        </Box>
        <CTAButtons />
      </Box>
      <AsSeenInSection />

      <WhyGames />

      <CTAButtons />

      <Testimonials />

      <WorkWithUs />

      <AboutUs isComponent={true} />

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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Connect with us:{" "}
          <Link
            to="https://bsky.app/profile/flyingcometgames.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.primary.light }}
          >
            Calli
          </Link>{" "}
          and{" "}
          <Link
            to="https://bsky.app/profile/3den.dev"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.primary.light }}
          >
            Eden
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
