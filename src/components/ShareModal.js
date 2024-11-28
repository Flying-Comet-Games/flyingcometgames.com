import React from "react";
import { Box, Typography, Button, Modal, IconButton } from "@mui/material";
import { X as CloseIcon, Send as SendIcon } from "lucide-react";

const ModalContent = ({ children }) => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "400px",
      bgcolor: "white",
      borderRadius: "8px",
      p: 4,
      outline: "none",
      textAlign: "center",
    }}
  >
    {children}
  </Box>
);

export const ShareModal = ({ open, onClose, onShare, isPreSolve = false }) => (
  <Modal open={open} onClose={onClose}>
    <ModalContent>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        {isPreSolve ? "Share before solving?" : "You solved it!"}
        {isPreSolve && (
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/game-logos/wordy-verse-confused.svg`}
            alt="duck mascot with a tilted head"
            sx={{
              display: { xs: "block", sm: "none" },
              width: "25%",
              height: "auto",
              my: 2,
              mx: "auto",
            }}
          />
        )}
      </Typography>

      {!isPreSolve && (
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Score preview grid would go here */}
          <Box
            sx={{
              width: 120,
              height: 120,
              border: "1px solid #000",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: "80%",
                height: 12,
                bgcolor: "#b8c26c",
                borderRadius: 0.5,
              }}
            />
            <Box
              sx={{
                width: "80%",
                height: 12,
                bgcolor: "#b8c26c",
                borderRadius: 0.5,
              }}
            />
            <Box
              sx={{
                width: "80%",
                height: 12,
                bgcolor: "#ecb061",
                borderRadius: 0.5,
              }}
            />
          </Box>
        </Box>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={onShare}
        startIcon={<SendIcon />}
        sx={{
          mb: 2,
          bgcolor: "#000",
          color: "#fff",
          "&:hover": {
            bgcolor: "#333",
          },
        }}
      >
        {isPreSolve ? "Yes share this puzzle" : "Share my score"}
      </Button>

      {!isPreSolve && (
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#000",
            color: "#fff",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          Create my free account!
        </Button>
      )}
    </ModalContent>
  </Modal>
);

export const ShareButton = ({ onClick }) => (
  <Button
    onClick={onClick}
    startIcon={<SendIcon />}
    sx={{
      mt: 2,
      color: "#000",
      borderColor: "#000",
      "&:hover": {
        borderColor: "#000",
        bgcolor: "rgba(0, 0, 0, 0.04)",
      },
    }}
  >
    Send to a friend
  </Button>
);

export const GameOverShare = ({ won, guesses, onShare, isLoggedIn }) => (
  <Box
    sx={{
      mt: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      {won ? "YOU SOLVED IT!" : "Better luck next time!"}
    </Typography>

    {!isLoggedIn && (
      <Typography variant="body2" color="text.secondary">
        Sign in to save your streak!
      </Typography>
    )}

    <Button
      variant="contained"
      onClick={onShare}
      sx={{
        bgcolor: won ? "#b8c26c" : "#000",
        color: won ? "#000" : "#fff",
        "&:hover": {
          bgcolor: won ? "#a5b154" : "#333",
        },
      }}
    >
      Share my score
    </Button>

    {!isLoggedIn && (
      <Button
        variant="contained"
        sx={{
          bgcolor: "#000",
          color: "#fff",
          "&:hover": {
            bgcolor: "#333",
          },
        }}
      >
        Create my free account!
      </Button>
    )}
  </Box>
);
