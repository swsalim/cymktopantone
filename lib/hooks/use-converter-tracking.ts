/**
 * Hook for tracking converter usage in color conversion components
 *
 * @param sourceColor The source color format (e.g., 'HEX', 'RGB')
 * @param targetColor The target color format (e.g., 'RGB', 'CMYK')
 */
export function useConverterTracking(sourceColor: string, targetColor: string) {
  // Helper functions for tracking specific events
  const trackCopy = (colorFormat: string, colorValue: string) => {
    window.seline?.track(`copy_${colorFormat.toLowerCase()}_value`, { color: colorValue });
  };

  const trackAddToHistory = () => {
    window.seline?.track(
      `add_to_history_${sourceColor.toLowerCase()}_to_${targetColor.toLowerCase()}`,
    );
  };

  const trackSelectFromHistory = () => {
    window.seline?.track(
      `select_from_history_${sourceColor.toLowerCase()}_to_${targetColor.toLowerCase()}`,
    );
  };

  return {
    trackCopy,
    trackAddToHistory,
    trackSelectFromHistory,
  };
}
