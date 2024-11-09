import { Typography } from "@mui/material";
import { getWordForDate, findLatestAvailableDate } from './Data';
import BaseWordyGame from '../../Utilities/BaseWordyGame';

const NYTGuildWordy = () => {
  const subtitleContent = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Play games made by the NYT Guild workers on strike{" "}
      <a
        href="https://nytimesguild.org/tech/guild-builds/"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      . Donate to the strike{" "}
      <a
        href="https://www.gofundme.com/f/nyt-tech-strike-fund"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      .
    </Typography>
  );

  return (
    <BaseWordyGame
      title="NYT GUILD"
      iconPath={`${process.env.PUBLIC_URL}/assets/wordy-topics/nyt-guild.svg`}
      subtitle={subtitleContent}
      shareText="NYT Guild Support Wordy"
      shareUrl="https://flyingcometgames.com/wordy-verse/nyt-guild-support"
      getWordForDate={getWordForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default NYTGuildWordy;