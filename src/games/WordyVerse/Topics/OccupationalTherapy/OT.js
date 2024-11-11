// OccupationalTherapy.js
import BaseWordyGame from "../../Utilities/BaseWordyGame";
import { getWordForDate, findLatestAvailableDate } from "./Data";

const OccupationalTherapyWordy = () => {
  return (
    <BaseWordyGame
      title="OT/PT"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/occupational-therapy.svg`}
    //   subtitle="Test your knowledge of occupational and physical therapy terminology."
      shareText="OT/PT Wordle"
      shareUrl="https://flyingcometgames.com/wordy-verse/occupational-therapy"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default OccupationalTherapyWordy;
