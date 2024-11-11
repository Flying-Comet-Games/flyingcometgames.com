// AnimalCrossing.js
import BaseWordyGame from '../../Utilities/BaseWordyGame';
import { getWordForDate, findLatestAvailableDate } from './Data';

const AnimalCrossingWordy = () => {
  return (
    <BaseWordyGame
      title="ANIMAL CROSSING"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/animal-crossing.svg`}
    //   subtitle="Test your knowledge of villagers, items, and places from Animal Crossing."
      shareText="Animal Crossing Wordle"
      shareUrl="https://flyingcometgames.com/wordy-verse/animal-crossing"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default AnimalCrossingWordy;