import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TrivaRoundUpBeta = () => {
  const theme = useTheme();

  return (
    <Button
      component={Link}
      to={"/trivia-roundup/seattle"}
      variant="contained"
      sx={{
        width: "100%",
        padding: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "center",
        border: "1px solid black",
        backgroundColor: "#e2b48f",
        borderRadius: "12px",
        boxShadow: theme.shadows[2],
        color: theme.palette.text.primary,
        overflow: "hidden",
        "&:hover": {
          backgroundColor: theme.palette.grey[200],
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, mx: "auto" }}>
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/game-logos/trivia-roundup-squirrel.svg`}
          alt={`Trivia roundup logo`}
          sx={{
            width: { xs: "30%", sm: "50%"},
            height: { xs: "60px", sm: "70px" },
          }}
        />

        <Typography
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
            lineHeight: 1.5,
            fontWeight: 500,
            ml: 2,
            color: theme.palette.text.secondary,
            textTransform: "none",
            textAlign: "center",
            width: "100%",
            whiteSpace: "nowrap", // Prevent text from breaking
          }}
        >
          Trivia Roundup
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          lineHeight: 1.5,
          color: theme.palette.text.secondary,
          textTransform: "none",
          textAlign: "center",
          mx: "auto",
          fontWeight: 500,
        }}
      >
        COMING SOON
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          lineHeight: 1.5,
          color: theme.palette.text.secondary,
          textTransform: "none",
          textAlign: "center",
          mx: "auto",
        }}
      >
        Play the Seattle beta version now!
      </Typography>
    </Button>
  );
};

export default TrivaRoundUpBeta;
