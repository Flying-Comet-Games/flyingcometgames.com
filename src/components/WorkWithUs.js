import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const WorkWithUs = () => {
  return (
    <Box
      sx={{
        py: 4,
        px: 3,
        backgroundColor: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          textAlign: "left",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/ducks/yellow-back-square.svg`}
            alt="Goose"
            sx={{ width: "50px", height: "50px" }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Work with us!
          </Typography>
        </Box>

        {/* Features Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mb: 4 }}>
          {/* Feature 1 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/icons/location.svg`}
              alt="Location Icon"
              sx={{ width: "30px", height: "30px" }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Local focus
              </Typography>
              <Typography variant="body1">
                We focus exclusively on games tailored to engaging and growing
                your community.
              </Typography>
            </Box>
          </Box>

          {/* Feature 2 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/icons/snap.svg`}
              alt="Snap Icon"
              sx={{ width: "30px", height: "30px" }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Seamless setup
              </Typography>
              <Typography variant="body1">
                We make sure adding games to your site is hassle free, no new
                system to manage or technical knowledge required!
              </Typography>
            </Box>
          </Box>

          {/* Feature 3 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/icons/shake.svg`}
              alt="Shake Icon"
              sx={{ width: "30px", height: "30px" }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Full support
              </Typography>
              <Typography variant="body1">
                We are human-driven so you can rely on fast response times and
                thoughtful collaboration.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
            Ready to boost retention?
          </Typography>
          <Button
            variant="contained"
            href="https://cal.com/calli-fuchigami/15min"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 20,
              px: 4,
              py: 1,
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
                color: "#f8f8f8", // Ensure text color changes for accessibility
              },
            }}
          >
            Get started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkWithUs;
