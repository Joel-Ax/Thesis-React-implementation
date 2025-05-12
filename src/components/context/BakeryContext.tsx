import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { getBakeryParameters } from "../../services/api";
import type { BakeryManagerState } from "../../types/bakeryManager";

// Create context type
interface BakeryContextType {
  state: BakeryManagerState;
  fetchParameters: () => Promise<void>;
  clearError: () => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

// Provider component
interface BakeryProviderProps {
  children: ReactNode;
}

export const BakeryProvider: React.FC<BakeryProviderProps> = ({ children }) => {
  const [state, setState] = useState<BakeryManagerState>({
    parameters: null,
    loading: false,
    error: null,
  });

  /**
   * Fetch bakery parameters from the mock API
   */

  const fetchParameters = useCallback(async () => {
    // Set loading state
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      // Call the mock API function
      const data = await getBakeryParameters();

      // Update state with tthe received data
      setState({
        parameters: data,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Error fetching bakery data:", err);

      // Update state with error information
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, []);

  /**
   * Clear any error in the state
   */

  const clearError = useCallback(() => {
    setState((prevState) => ({ ...prevState, error: null }));
  }, []);

  // Fetch data on initial mount
  useEffect(() => {
    fetchParameters();
  }, [fetchParameters]);

  // Provide the state and functions to children
  return (
    <BakeryContext.Provider value={{ state, fetchParameters, clearError }}>
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakeryManager = (): BakeryContextType => {
  const context = useContext(BakeryContext);
  if (context === undefined) {
    throw new Error("useBakeryManager must be used within a BakeryProvider");
  }
  return context;
};
