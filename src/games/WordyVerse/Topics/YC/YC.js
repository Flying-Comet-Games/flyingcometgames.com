// YCombinator.js
import { Typography } from "@mui/material";
import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Utilities/BaseWordyGame";

const YCombinatorWordy = () => {
  const subtitleContent = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Test your startup knowledge with daily words about Y Combinator, its
      alumni companies, founders, and startup terminology!
    </Typography>
  );

  return (
    <BaseWordyGame
    iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/yc.svg`}
    title="Y Combinator"
    //   subtitle={subtitleContent}
      shareText="YC Wordy"
      shareUrl="https://flyingcometgames.com/wordy-verse/yc"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default YCombinatorWordy;
