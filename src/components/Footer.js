import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: theme.palette.background.default,
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2024 Flying Comet Games. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Connect with us: {" "}
        <Link
          href="https://bsky.app/profile/flyingcometgames.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: theme.palette.primary.light }}
        >
          Calli
        </Link>{" "}
        and {" "}
        <Link
          href="https://bsky.app/profile/3den.dev"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: theme.palette.primary.light }}
        >
          Eden
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
