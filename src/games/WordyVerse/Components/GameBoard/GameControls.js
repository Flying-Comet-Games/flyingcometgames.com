import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { keyframes } from '@mui/system';

const popIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  40% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const GameControls = ({ 
  currentDate, 
  onDateChange, 
  showHint, 
  onHintToggle, 
  wordData 
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() => onDateChange(-1)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            tabIndex={-1}
          >
            <ChevronLeft />
          </IconButton>
          <Typography sx={{ mx: 2, color: "black" }}>
            {currentDate.toLocaleDateString("en-US")}
          </Typography>
          <IconButton
            onClick={() => onDateChange(1)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            tabIndex={-1}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        <Tooltip
          title={showHint ? `Topic: ${wordData.theme}` : "Need a hint?"}
          arrow
          placement="top"
        >
          <IconButton
            onClick={onHintToggle}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            tabIndex={-1}
            sx={{
              color: showHint ? "#F93854" : "action.disabled",
              "&:hover": { color: "#F93854" },
              transition: "color 0.3s ease",
            }}
          >
            <Lightbulb size={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {showHint && (
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: "#F93854",
            fontStyle: "italic",
            animation: `${popIn} 0.3s ease-in`,
          }}
        >
          Hint: {wordData.theme}
        </Typography>
      )}
    </>
  );
};

export default GameControls;