import { useState } from 'react';
import { Dialog, DialogContent, IconButton, Box, Typography } from '@mui/material';
import { Lightbulb, X } from 'lucide-react';

const HintModal = ({ hint, open, onClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          m: 2,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: 4, pb: 3, px: 3 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
        >
          <X size={24} />
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 4 }}>

          <Lightbulb size={20} />
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: '1.25rem',
              color: 'text.primary',
            }}
          >
            Hint: <br /> {hint}
          </Typography>
        </Box>

        <Box sx={{ px: 2 }}>
          {children}
        </Box>
      </Box>
    </Dialog>
  );
};

const ColorBox = ({ color, backgroundColor, children }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    mb: 2,
    gap: 2 
  }}>
    <Box
      sx={{
        width: 40,
        height: 40,
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        fontWeight: 'bold',
        fontSize: '1.25rem',
      }}
    >
      {children}
    </Box>
    <Typography sx={{ flex: 1 }}>
      {backgroundColor === 'black' ? 'Incorrect letter' :
       backgroundColor === '#ecb061' ? 'Correct letter\nIncorrect place' :
       'Correct letter\nCorrect place'}
    </Typography>
  </Box>
);

const HintContent = () => (
  <>
    <ColorBox color="white" backgroundColor="black">
      A
    </ColorBox>
    <ColorBox color="white" backgroundColor="#ecb061">
      B
    </ColorBox>
    <ColorBox color="black" backgroundColor="#b8c26c">
      C
    </ColorBox>
  </>
);

export default function GameHint({ hint, open, onClose }) {
  return (
    <HintModal hint={hint} open={open} onClose={onClose}>
      <HintContent />
    </HintModal>
  );
}