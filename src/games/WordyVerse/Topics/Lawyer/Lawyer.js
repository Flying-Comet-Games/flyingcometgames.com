import { getWordForDate, findLatestAvailableDate } from "./Data";
import BaseWordyGame from "../../Components/BaseWordyGame";

const LawyerWordy = () => {
  return (
    <BaseWordyGame
      title="LAWYER"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/lawyer.svg`}
    //   subtitle="Test your knowledge of legal terms and Latin phrases commonly used in law."
      shareText="Lawyer Wordle"
      shareUrl="https://flyingcometgames.com/wordy-verse/lawyer"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default LawyerWordy;