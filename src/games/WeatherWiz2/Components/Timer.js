import React, { useEffect } from "react";
import { Typography } from "@mui/material";

const Timer = ({ timeElapsed, setTimeElapsed, isPaused }) => {
  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Typography variant="h6" sx={{ mb: 2 }}>
      Timer: {formatTime(timeElapsed)}
    </Typography>
  );
};

export default Timer;
