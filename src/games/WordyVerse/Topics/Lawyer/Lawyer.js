import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Components/BaseWordyGame";

const LawyerWordy = () => {
  return (
    <BaseWordyGame
      title="LEGAL"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/lawyer.svg`}
    //   subtitle="Test your knowledge of legal terms and Latin phrases commonly used in law."
      shareText="Legal Wordle"
      shareUrl="https://flyingcometgames.com/wordy-verse/legal"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default LawyerWordy;