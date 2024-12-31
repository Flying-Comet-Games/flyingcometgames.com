// GridTile.js - Represents a single grid tile
import React from 'react';
import { Button } from '@mui/material';

const GridTile = ({ row, col, value, onClick, isValidPlacement }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => onClick(row, col)}
      sx={{
        width: '100%',
        height: '100%',
        fontSize: '1.5rem',
        bgcolor: isValidPlacement ? 'background.paper' : 'error.main',
        color: isValidPlacement ? 'text.primary' : 'text.secondary',
      }}
    >
      {value || ''}
    </Button>
  );
};

export default GridTile;
