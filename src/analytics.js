import ReactGA from 'react-ga4';

export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
  logReferrer();
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  logReferrer();
};

export const logEvent = (category, action, label, value) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export const incrementGamesPlayed = (gameName) => {
  ReactGA.event({
    category: 'Game',
    action: 'Played',
    label: gameName,
    game_name: gameName,
    games_played: 1,
  });
};

export const incrementGamesCompleted = (gameName) => {
  ReactGA.event({
    category: 'Game',
    action: 'Completed',
    label: gameName,
    game_name: gameName,
    games_completed: 1,
  });
};

export const setUserId = (userId) => {
  ReactGA.set({ userId: userId });
};

export const logReferrer = () => {
  const referrer = document.referrer;
  if (referrer) {
    ReactGA.event({
      category: 'User Acquisition',
      action: 'Referrer',
      label: referrer,
    });
  }
};
