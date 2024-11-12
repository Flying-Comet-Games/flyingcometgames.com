// Seattle.js
import { Typography } from "@mui/material";
import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Components/BaseWordyGame";

const SeattleWordy = () => {
  const subtitleContent = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Guess words related to Seattle landmarks, neighborhoods, local spots, and
      natural features. A daily word puzzle for locals and lovers of the Emerald
      City!
    </Typography>
  );

  return (
    <BaseWordyGame
      title="SEATTLE"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/seattle.svg`}
    //   subtitle={subtitleContent}
      shareText="Seattle Wordy"
      shareUrl="https://flyingcometgames.com/wordy-verse/seattle"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default SeattleWordy;
