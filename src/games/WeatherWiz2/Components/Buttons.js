import React from "react";
import { Box, Button } from "@mui/material";

const Buttons = ({ onUndo, onClear, undoDisabled }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
      <Button variant="contained" onClick={onUndo} disabled={undoDisabled}>
        Undo Last Sum
      </Button>
      <Button variant="contained" color="error" onClick={onClear}>
        Clear Grid
      </Button>
    </Box>
  );
};

export default Buttons;
