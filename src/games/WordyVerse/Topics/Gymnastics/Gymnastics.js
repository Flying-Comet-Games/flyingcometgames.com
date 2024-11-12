// Gymnastics.js
import { Typography } from "@mui/material";
import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Components/BaseWordyGame";

const GymnasticsWordy = () => {
  const subtitleContent = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Test your gymnastics knowledge with daily words about skills, equipment,
      judging, and more. Perfect for gymnasts, coaches, and fans of the sport!
    </Typography>
  );

  return (
    <BaseWordyGame
      title="GYMNASTICS"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/gymnastics.svg`}
    //   subtitle={subtitleContent}
      shareText="Gymnastics Wordy"
      shareUrl="https://flyingcometgames.com/wordy-verse/gymnastics"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default GymnasticsWordy;
