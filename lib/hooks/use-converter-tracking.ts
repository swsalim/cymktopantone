import { useEffect, useState } from 'react';

import { saEvent } from '@/lib/analytics';

/**
 * Hook for tracking converter usage in color conversion components
 *
 * @param sourceColor The source color format (e.g., 'HEX', 'RGB')
 * @param targetColor The target color format (e.g., 'RGB', 'CMYK')
 * @param trackingValue The value to track changes on (usually the input color value)
 * @param debounceMs Debounce time in milliseconds to prevent excessive event firing
 */
export function useConverterTracking(
  sourceColor: string,
  targetColor: string,
  trackingValue: string,
  debounceMs = 1500,
) {
  // Keep track of the last value we tracked to avoid duplicate events
  const [lastTrackedValue, setLastTrackedValue] = useState(trackingValue);

  // Track conversions with debouncing
  useEffect(() => {
    // Only track if the value has changed
    if (trackingValue !== lastTrackedValue && trackingValue) {
      // Set a timeout to prevent tracking rapid changes
      const timer = setTimeout(() => {
        saEvent(`conversion_${sourceColor}_to_${targetColor}`);
        setLastTrackedValue(trackingValue);
      }, debounceMs);

      return () => clearTimeout(timer);
    }
  }, [trackingValue, lastTrackedValue, sourceColor, targetColor, debounceMs]);

  // Track page view on component mount
  useEffect(() => {
    saEvent(`converter_usage_${sourceColor}_to_${targetColor}`);
  }, [sourceColor, targetColor]);

  // Helper functions for tracking specific events
  const trackCopy = (valueType: string) => {
    saEvent(`copy_${valueType.toLowerCase()}_value`);
  };

  const trackAddToHistory = () => {
    saEvent(`add_to_history_${sourceColor.toLowerCase()}_to_${targetColor.toLowerCase()}`);
  };

  const trackSelectFromHistory = () => {
    saEvent(`select_from_history_${sourceColor.toLowerCase()}_to_${targetColor.toLowerCase()}`);
  };

  return {
    trackCopy,
    trackAddToHistory,
    trackSelectFromHistory,
  };
}
