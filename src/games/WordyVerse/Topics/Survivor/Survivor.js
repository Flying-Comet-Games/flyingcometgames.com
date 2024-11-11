// Survivor.js
import { Typography } from "@mui/material";
import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Utilities/BaseWordyGame";

const SurvivorWordy = () => {
  const subtitleContent = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Test your Survivor knowledge with daily words about challenges, tribal
      council, game terminology, and iconic moments from over 40 seasons!
    </Typography>
  );

  return (
    <BaseWordyGame
      title="SURVIVOR"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/survivor.svg`}
    //   subtitle={subtitleContent}
      shareText="Survivor Wordle"
      shareUrl="https://flyingcometgames.com/wordy-verse/survivor"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default SurvivorWordy;
