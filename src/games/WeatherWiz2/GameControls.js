// GameControls.js - Controls for the game
import React from 'react';
import { Button, Grid } from '@mui/material';

const GameControls = ({ elements, selectedElement, onSelectElement, onClear, onCheck }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {elements.map((element) => (
        <Grid item key={element}>
          <Button
            variant={selectedElement === element ? 'contained' : 'outlined'}
            onClick={() => onSelectElement(element)}
            sx={{
              minWidth: 0,
              width: 40,
              height: 40,
              fontSize: '1.5rem',
            }}
          >
            {element}
          </Button>
        </Grid>
      ))}
      <Grid item>
        <Button variant="contained" color="primary" onClick={onClear}>
          Clear
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={onCheck}>
          Check
        </Button>
      </Grid>
    </Grid>
  );
};

export default GameControls;
