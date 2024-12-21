import { Box, Typography } from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";

const LevelInfo = ({ level, description, score }) => {
  const starThresholds = [1000, 1200, 1500]; // Define thresholds for stars
  const maxThreshold = starThresholds[starThresholds.length - 1];
  const progress = Math.min((score / maxThreshold) * 100, 100); // Total progress percentage

  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", mb: 2, textAlign: "center" }}>
      {/* Level Info */}
      <Typography variant="h6">Level {level}</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>{description}</Typography>

      {/* Progress Bar with Stars */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          height: "48px",
          mt: 2,
        }}
      >
        {/* Base Line */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "4px",
            bgcolor: "grey.300",
            transform: "translateY(-50%)",
          }}
        />
        {/* Progress Line */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `${progress}%`,
            height: "4px",
            background: "linear-gradient(to right, gold, orange)",
            transform: "translateY(-50%)",
          }}
        />
        {/* Star Points */}
        {starThresholds.map((threshold, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              flex: "1 1 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Star Icons */}
            {score >= threshold ? (
              <Star
                sx={{
                  color: "gold",
                  fontSize: "32px",
                  zIndex: 1,
                  border: "2px solid white", // Subtle outline
                  borderRadius: "50%",
                  padding: "2px", // Creates a "halo" effect
                  bgcolor: "rgba(255, 255, 255, 0.5)", // Optional glow background
                  transition: "transform 0.3s ease, color 0.3s ease",
                  transform: "scale(1.2)",
                }}
              />
            ) : (
              <StarOutline
                sx={{
                  color: "grey.400",
                  fontSize: "32px",
                  zIndex: 1,
                }}
              />
            )}
            {/* Threshold Labels */}
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: "36px", // Adjusted to position below the star
                fontSize: "0.8rem",
                color: "grey.700",
              }}
            >
              {threshold}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LevelInfo;
