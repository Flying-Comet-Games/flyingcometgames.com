import ReactGA from 'react-ga4';

export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export const setUserId = (userId) => {
  ReactGA.set({ userId: userId });
};

export const incrementGamesPlayed = (gameName) => {
    ReactGA.event({
      category: 'Game',
      action: 'Played',
      label: gameName,
      metric1: 1, // Increment Games Played metric
      dimension1: gameName, // Set Game Name dimension
    });
  };

  export const incrementGamesCompleted = (gameName) => {
    ReactGA.event({
      category: 'Game',
      action: 'Completed',
      label: gameName,
      metric2: 1, // Increment Games Completed metric
      dimension1: gameName, // Set Game Name dimension
    });
  };