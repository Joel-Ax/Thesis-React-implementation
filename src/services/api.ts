import axios from "axios";
import type { BakeryParameters } from "../types/bakeryManager";

function validateBakeryParameters(
  data: Record<string, unknown>
): BakeryParameters {
  // Validate that data is an object
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid parameters: data must be an object: " + data);
  }

  // Validate all required fields with their types
  if (typeof data.storeStatus !== "string") {
    throw new Error("Invalid parameters: storeStatus must be a string");
  }
  if (typeof data.dailySales !== "number") {
    throw new Error("Invalid parameters: dailySales must be a number");
  }
  if (typeof data.customerSatisfaction !== "number") {
    throw new Error(
      "Invalid parameters: customerSatisfaction must be a number"
    );
  }
  if (typeof data.bakeryName !== "string") {
    throw new Error("Invalid parameters: bakeryName must be a string");
  }
  if (typeof data.establishedYear !== "number") {
    throw new Error("Invalid parameters: establishedYear must be a number");
  }
  if (typeof data.kitchenWidth !== "number") {
    throw new Error("Invalid parameters: kitchenWidth must be a number");
  }
  if (typeof data.kitchenHeight !== "number") {
    throw new Error("Invalid parameters: kitchenHeight must be a number");
  }
  if (
    !Array.isArray(data.menuItems) ||
    !data.menuItems.every((item) => typeof item === "string")
  ) {
    throw new Error(
      "Invalid parameters: menuItems must be an array of strings"
    );
  }
  if (typeof data.specialtyFlavor !== "string") {
    throw new Error("Invalid parameters: specialtyFlavor must be a string");
  }
  if (typeof data.organicIngredients !== "boolean") {
    throw new Error("Invalid parameters: organicIngredients must be a boolean");
  }
  if (typeof data.minimumOrderAmount !== "number") {
    throw new Error("Invalid parameters: minimumOrderAmount must be a number");
  }

  return {
    storeStatus: data.storeStatus as string,
    dailySales: data.dailySales as number,
    customerSatisfaction: data.customerSatisfaction as number,
    bakeryName: data.bakeryName as string,
    establishedYear: data.establishedYear as number,
    kitchenWidth: data.kitchenWidth as number,
    kitchenHeight: data.kitchenHeight as number,
    menuItems: data.menuItems as string[],
    specialtyFlavor: data.specialtyFlavor as string,
    organicIngredients: data.organicIngredients as boolean,
    minimumOrderAmount: data.minimumOrderAmount as number,
  };
}

// Create an axios instance with the base URL pointing to the JSON server
const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: {
    "Content-Type": "applications/json",
  },
});

/**
 * Fetch bakery parameters from the mock JSON server
 *
 * @returns Promise resolving to BakeryParameters
 */
export const getBakeryParameters = async (): Promise<BakeryParameters> => {
  try {
    const response = await api.get("/bakeryParameters");
    return validateBakeryParameters(response.data);
  } catch (error) {
    console.error("Error fetching bakery data", error);
    throw error;
  }
};
