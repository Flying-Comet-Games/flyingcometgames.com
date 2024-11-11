// Friends.js
import BaseWordyGame from "../../Utilities/BaseWordyGame";
import { getWordForDate, findLatestAvailableDate } from "./Data";

const FriendsWordy = () => {
  return (
    <BaseWordyGame
      title="FRIENDS"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/friends.svg`}
    //   subtitle="Test your knowledge of characters, iconic moments, and NYC life from Friends."
      shareText="Friends Wordle"
      shareUrl="https://flyingcometgames.com/wordy-verse/friends"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default FriendsWordy;
