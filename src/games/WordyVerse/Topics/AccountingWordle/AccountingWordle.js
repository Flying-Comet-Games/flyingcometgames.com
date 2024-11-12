import BaseWordyGame from '../../Components/BaseWordyGame';
import { getWordForDate, findLatestAvailableDate } from './Data';

const AccountingWordy = () => {
  return (
    <BaseWordyGame
      title="ACCOUNTING"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/accounting-wordle-icon.png`}
      subtitle="Words may include common slang, Excel formulas or abbreviations."
      shareText="Accounting Wordle"
      shareUrl="https://flyingcometgames.com/wordy-verse/accounting-wordle"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default AccountingWordy;