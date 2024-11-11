// AmericanDad.js
import { Typography } from "@mui/material";
import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Utilities/BaseWordyGame";

const AmericanDadWordy = () => {
  const subtitleContent = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Test your American Dad knowledge! Guess characters, locations, Roger's
      personas, and other elements from the show.
    </Typography>
  );

  return (
    <BaseWordyGame
      title="AMERICAN DAD"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/american-dad.svg`}
    //   subtitle={subtitleContent}
      shareText="American Dad Wordle"
      shareUrl="https://flyingcometgames.com/wordy-verse/american-dad"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default AmericanDadWordy;
