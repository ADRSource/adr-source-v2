import pThrottle from 'p-throttle';

/**
 * Throttle function to limit the number of times a function can be called in a given time frame.
 *
 * Hygraph's community plan only allows 5 requests per second.
 */
export const throttle = pThrottle({ limit: 5, interval: 1000 });
