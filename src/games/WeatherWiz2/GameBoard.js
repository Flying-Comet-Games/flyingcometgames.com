// GameBoard.js - Represents the game board
import React from 'react';
import { Grid, Box } from '@mui/material';
import GridTile from './GridTile';

const GameBoard = ({ grid, onTileClick, validatePlacement }) => {
  return (
    <Box sx={{
      width: '100%',
      pb: '100%',
      position: 'relative',
      mb: 2,
    }}>
      <Grid
        container
        spacing={1}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Grid item xs={12 / grid.length} key={`${rowIndex}-${colIndex}`} sx={{
              height: '20%',
              padding: '1%',
            }}>
              <GridTile
                row={rowIndex}
                col={colIndex}
                value={value}
                onClick={onTileClick}
                isValidPlacement={validatePlacement(rowIndex, colIndex)}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default GameBoard;
