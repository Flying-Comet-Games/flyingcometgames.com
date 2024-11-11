// Yoga.js
import { Typography } from "@mui/material";
import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Utilities/BaseWordyGame";

const YogaWordy = () => {
  const subtitleContent = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Test your Sanskrit vocabulary with daily yoga-related words! Featuring
      poses (asanas), breathing techniques (pranayama), philosophy concepts, and
      more.
    </Typography>
  );

  return (
    <BaseWordyGame
      title="YOGA"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/yoga.svg`}
    //   subtitle={subtitleContent}
      shareText="Yoga Wordy"
      shareUrl="https://flyingcometgames.com/wordy-verse/yoga"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default YogaWordy;
