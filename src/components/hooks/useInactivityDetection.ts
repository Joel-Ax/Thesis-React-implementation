import { useState, useEffect, useRef, useCallback } from "react";
import useActivityMonitor from "./useActivityMonitor";

interface InactivityDetectionOptions {
  inactivityTimeout: number; // Time in milliseconds before showing inactivity state
  deadBandTime?: number; // Minimum time between activity callbaks
}

/**
 * Hooke fo detecting user inactivty.
 *
 * This hook will monitor the user's activity and set an isActive state to false
 * after the specified inactivity timeout period.
 *
 * @params options - Configuration options for inactivity detection
 * @return Object with state variables and control functions
 */

const useInactivityDetection = (options: InactivityDetectionOptions) => {
  const { inactivityTimeout, deadBandTime = 100 } = options;

  const [isActive, setisActive] = useState<boolean>(true);
  const lastActivityTimeRef = useRef<number>(Date.now());
  const inactivtyCheckTimerRef = useRef<number | null>(null);

  const trackActivity = useCallback(() => {
    lastActivityTimeRef.current = Date.now();

    // If we're showing the inactivy dialo,g restore normal state
    if (!isActive) {
      setisActive(true);
    }
  }, [isActive]);

  // Set up activity monitor
  useActivityMonitor(trackActivity, { deadBandTime });

  // Check if the userhas been inactive for longer than the inactivty timeout
  const checkInacitivty = useCallback(() => {
    const timeSinceLastAcitivty = Date.now() - lastActivityTimeRef.current;

    if (timeSinceLastAcitivty > inactivityTimeout && isActive) {
      setisActive(false);
      return true;
    }
    return false;
  }, [inactivityTimeout, isActive]);

  const resumeActivity = useCallback(() => {
    lastActivityTimeRef.current = Date.now();
    setisActive(true);
  }, []);

  // Start inactivty checker
  useEffect(() => {
    // Initialize timestamp
    lastActivityTimeRef.current = Date.now();

    // Set up inactivity checking
    inactivtyCheckTimerRef.current = window.setInterval(() => {
      checkInacitivty();
    }, 1000); // Check every second

    // Clean up
    return () => {
      if (inactivtyCheckTimerRef.current) {
        clearInterval(inactivtyCheckTimerRef.current);
        inactivtyCheckTimerRef.current = null;
      }
    };
  }, [checkInacitivty]);
  return {
    isActive,
    resumeActivity,
  };
};

export default useInactivityDetection;
