  // Boba.js
  import { Typography } from "@mui/material";
  import { getWordForDate, findLatestAvailableDate } from './Data';
  import BaseWordyGame from '../../Utilities/BaseWordyGame';
  
  const BobaWordy = () => {
    const subtitleContent = (
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        A daily word puzzle for boba tea enthusiasts! Guess words related to bubble tea, 
        its ingredients, and the experience of enjoying this beloved drink.
      </Typography>
    );
  
    return (
      <BaseWordyGame
        title="BOBA TEA"
        iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/boba-tea.svg`}
        // subtitle={subtitleContent}
        shareText="Boba Tea Wordy"
        shareUrl="https://flyingcometgames.com/wordy-verse/boba-tea"
        getWordForDate={getWordForDate}
        findLatestAvailableDate={findLatestAvailableDate}
      />
    );
  };
  
  export default BobaWordy;