/**
 * Parameters for the Bakery Management System
 *
 * Tracks inventory, sales, and production metrics
 */
interface BakeryParameters {
  storeStatus: string; // Current operating status of the bakery
  dailySales: number; // Total sales amount for the current day
  customerSatisfaction: number; // Average customer rating out of 5
  bakeryName: string; // Name of the bakery
  establishedYear: number; // Year the bakery was established
  kitchenWidth: number; // Width of the kitchen area in square feet
  kitchenHeight: number; // Height of the kitchen ceiling in feet
  menuItems: string[]; // List of available baked goods
  specialtyFlavor: string; // Bakery's signature flavor profile
  organicIngredients: boolean; // Whether the bakery uses organic ingredients
  minimumOrderAmount: number; // Minimum order amount for delivery
}

/**
 * State management for the Bakery Management component
 *
 * Tracks loading states, errors, and parameter configuration
 */
interface BakeryManagerState {
  // Current bakery parameters or null if not loaded
  parameters: BakeryParameters | null;
  // Loading state for API operations
  loading: boolean;
  // API communication errors
  error: string | null;
}

export type { BakeryParameters, BakeryManagerState };
