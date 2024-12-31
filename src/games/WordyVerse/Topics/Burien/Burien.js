// Seattle.js
import { Typography } from "@mui/material";
import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Components/BaseWordyGame";

const BurienWordy = () => {
  return (
    <BaseWordyGame
      title="Burien"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/burien.png`}
      shareText="Seattle Wordy"
      shareUrl="https://flyingcometgames.com/wordy-verse/burien"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default BurienWordy;
