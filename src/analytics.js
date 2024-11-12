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
    // Initialize with opt-out tracking disabled until we have consent
    mixpanel.init(token, {
      debug: process.env.NODE_ENV !== 'production',
      track_pageview: true,
      persistence: "localStorage",
      opt_out_tracking_by_default: true, // Start with tracking disabled
      opt_out_persistence_by_default: true // Don't persist opt-out status
    });

    // Enable tracking since we have consent
    mixpanel.opt_in_tracking();
    isOptedOut = false;
    isInitialized = true;

    // Track initialization
    safeTrack('Analytics Initialized', {
      timestamp: new Date().toISOString(),
      consentStatus: 'accepted'
    });

  } catch (error) {
    console.error('Failed to initialize Mixpanel:', error);
  }
};

export const disableAnalytics = () => {
  if (!isInitialized) return;

  try {
    // Opt out of tracking
    mixpanel.opt_out_tracking();
    isOptedOut = true;

    // Clear any existing super properties
    mixpanel.reset();

    // Clear persistence
    localStorage.removeItem('mp_opt_in_out');

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