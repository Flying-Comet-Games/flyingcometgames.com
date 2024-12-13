import React from "react";
import { Box, Typography, Button, Modal, IconButton } from "@mui/material";
import { X as CloseIcon, Send as SendIcon } from "lucide-react";
import SignupButton from "../../../games/WordyVerse/SignupButton";

const ModalContent = ({ children, success }) => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "400px",
      bgcolor: success ? "#b8c26c" : "white",
      borderRadius: "8px",
      p: 4,
      outline: "none",
      textAlign: "center",
    }}
  >
    {children}
  </Box>
);

export const ShareModal = ({
  open,
  onClose,
  onShare,
  score = 0,
  timeRemaining = 0,
  gameOver = false,
  isCorrect = false,
  onCreateAccount,
}) => {
  const timeSpent = 60 - Math.ceil(timeRemaining / 1000);

  const getModalContent = () => {
    if (!gameOver) {
      return {
        title: "Share before solving?",
        image: "/assets/game-logos/quick-quack-confused.svg",
        buttonText: "Share this puzzle"
      };
    }

    if (isCorrect) {
      const timeBonus = Math.floor((timeRemaining / 60000) * 1000);
      return {
        title: "SOLVED!",
        image: "/assets/game-logos/wordy-verse-party.svg",
        buttonText: "Share my score",
        stats: [
          { label: "Letters", value: `${score - timeBonus}` },
          { label: "Time Bonus", value: `+${timeBonus}` },
          { label: "Total Score", value: score },
          { label: "Time", value: `${timeSpent}s` }
        ]
      };
    }

    return {
      title: "Time's up!",
      image: "/assets/game-logos/quick-quack-sad.svg",
      buttonText: "Share my attempt",
      stats: [
        { label: "Score", value: score },
        { label: "Time", value: "60s" }
      ]
    };
  };

  const content = getModalContent();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent success={isCorrect}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "black" }}
        >
          {content.title}
        </Typography>

        {content.stats && (
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              bgcolor: 'white',
              p: 2,
              borderRadius: 1
            }}
          >
            {content.stats.map((stat, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: i < content.stats.length - 1 ? '1px solid #eee' : 'none',
                  pb: i < content.stats.length - 1 ? 1 : 0
                }}
              >
                <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                  {stat.label}
                </Typography>
                <Typography sx={{ color: 'black' }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Button
          fullWidth
          startIcon={<SendIcon />}
          variant="contained"
          onClick={onShare}
          sx={{
            mb: 2,
            bgcolor: "black",
            borderRadius: "20px",
            color: "white",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          {content.buttonText}
        </Button>

        <SignupButton />

        {gameOver && isCorrect && (
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/game-logos/wordy-verse-party.svg`}
            alt="celebrating mascot"
            sx={{
              position: "absolute",
              bottom: -3,
              right: 0,
              width: "30px",
              height: "auto",
            }}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export const ShareButton = ({ onClick }) => (
  <Button
    onClick={onClick}
    startIcon={<SendIcon />}
    sx={{
      my: 2,
      color: "#000",
      textDecoration: "underline",
      "&:hover": {
        bgcolor: "transparent",
      },
    }}
  >
    Send to a friend
  </Button>
);