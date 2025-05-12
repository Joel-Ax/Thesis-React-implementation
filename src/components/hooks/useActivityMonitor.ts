import { useEffect, useRef } from "react";

interface ActivityMonitorOptions {
  deadBandTime?: number;
}

/**
 * Hook for monitoring user activity.
 *
 * This hook will monitor the user's activity, such as moving the mouse or typing.
 * Whenever there is some activity, the hook will call the provided callback function.
 *
 * @param onActivity - Callback function called when activity is detected
 * @param options  Configuration options for dead band timing
 */

const useActivityMonitor = (
  onActivity: () => void,
  options: ActivityMonitorOptions = {}
) => {
  // Configure dead band time with default
  const deadBandTime = options.deadBandTime ?? 1000;

  // Track when we last triggered activity
  const lastTriggerTimeRef = useRef<number>(0);

  useEffect(() => {
    /**
     * Handle user acitivty evens with dead band
     * Calls the onActivity callback immediately if we're outside the dead band
     */
    const handleActivity = () => {
      const currentTime = Date.now();

      // If we're outside the dead bad period, trigger activity
      if (currentTime - lastTriggerTimeRef.current >= deadBandTime) {
        lastTriggerTimeRef.current = currentTime;
        onActivity();
      }
    };

    // Set up activity monitoring
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("scroll", handleActivity);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [deadBandTime, onActivity]);
};

export default useActivityMonitor;
