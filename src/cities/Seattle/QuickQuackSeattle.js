import React from "react";

import QuickQuackBase from "../Games/QuickQuack/QuickQuackBase";
import { findLatestAvailableDate, getPhraseForDate } from "./Data/quickquack-data";

const QuickQuackSeattle = () => {
  return (
    <QuickQuackBase
      title="Quick Quack"
      iconPath="/assets/game-tiles/quick-quack-seattle.svg"
      subtitle="Complete the phrase before time runs out"
      shareText="Quick Quack Seattle"
      shareUrl="https://flyingcometgames.com/quick-quack/seattle"
      getPhraseForDate={getPhraseForDate}
      findLatestAvailableDate={findLatestAvailableDate}
    />
  );
};

export default QuickQuackSeattle;