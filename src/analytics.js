import mixpanel from "mixpanel-browser";

let isInitialized = false;
let isOptedOut = false;

export const initializeAnalytics = () => {
  const token = process.env.REACT_APP_MIXPANEL_PROJECT_TOKEN;

  if (!token) {
    console.warn('Mixpanel token not found. Analytics will not be tracked.');
    return;
  }

  try {
    // Always initialize Mixpanel, but with tracking disabled by default
    mixpanel.init(token, {
      debug: process.env.NODE_ENV !== 'production',
      track_pageview: true,
      persistence: "localStorage",
      opt_out_tracking_by_default: false, // Changed to false since we'll manage this manually
      opt_out_persistence_by_default: false // Allow persistence
    });

    isInitialized = true;

    // Check if user has already given consent
    const hasConsent = localStorage.getItem('analytics_cookie_consent') === 'true';

    if (hasConsent) {
      mixpanel.opt_in_tracking();
      isOptedOut = false;
    } else {
      mixpanel.opt_out_tracking();
      isOptedOut = true;
    }

    if (hasConsent) {
      // Track initialization only if we have consent
      safeTrack('Analytics Initialized', {
        timestamp: new Date().toISOString(),
        consentStatus: 'accepted'
      });
    }

  } catch (error) {
    console.error('Failed to initialize Mixpanel:', error);
  }
};


export const enableAnalytics = () => {
  if (!isInitialized) {
    initializeAnalytics();
  }

  mixpanel.opt_in_tracking();
  isOptedOut = false;

  // Track the opt-in event
  safeTrack('Analytics Opted In', {
    timestamp: new Date().toISOString()
  });
};



export const disableAnalytics = () => {
  if (!isInitialized) return;

  try {
    mixpanel.opt_out_tracking();
    isOptedOut = true;

    // Clear any existing super properties
    mixpanel.reset();

    console.log('Analytics tracking disabled successfully');
  } catch (error) {
    console.error('Failed to disable analytics:', error);
  }
};

// Safe tracking wrapper that respects opt-out status
const safeTrack = (eventName, properties = {}) => {
  if (!isInitialized || isOptedOut) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Analytics event not tracked (${eventName}): Analytics ${
        !isInitialized ? 'not initialized' : 'opted out'
      }`);
    }
    return;
  }

  try {
    mixpanel.track(eventName, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error(`Failed to track event ${eventName}:`, error);
  }
};

// Update existing tracking functions to use safeTrack
export const logEvent = (eventName, properties = {}) => {
  safeTrack(eventName, properties);
};

export const logGameStarted = (gameTitle, extras = {}) => {
  extras['title'] = gameTitle;

  logEvent("Game started", extras);
}

export const logGameEnded = (gameTitle, extras = {}) => {
  extras['title'] = gameTitle;

  logEvent("Game ended", extras);
}

export const logGameShared = (gameTitle, extras = {}) => {
  extras['title'] = gameTitle;

  logEvent("Game shared", extras);
}

export const logUserLogin = (userId, properties = {}) => {
  if (!isInitialized || isOptedOut) return;

  try {
    mixpanel.identify(userId);

    mixpanel.people.set({
      $userId: userId,
      $last_login: new Date(),
      ...properties
    });

    safeTrack('User Login', {
      userId,
      loginTime: new Date().toISOString(),
      ...properties
    });
  } catch (error) {
    console.error('Failed to log user login:', error);
  }
};

// Add consent status check to all tracking functions
export const isTrackingEnabled = () => {
  return isInitialized && !isOptedOut;
};