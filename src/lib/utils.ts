import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MAX_PRICE } from "./var";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const eightDigitDate = () => {
   const date = new Date();
   const year = date.getFullYear();
   const month = (1 + date.getMonth()).toString().padStart(2, "0");
   const day = date.getDate().toString().padStart(2, "0");
   return year + month + day;
};

export function randomString(length: number) {
   const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   let result = "";
   for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return result;
}

export function stringsAreEqual(
   a: string | null | undefined,
   b: string | null | undefined
): boolean {
   if (typeof a !== "string" || typeof b !== "string") return false;
   return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export const returnDateToday = () => {
   return new Date().toISOString().split("T")[0];
};

// Helper function to handle numeric select values
export const getSelectValue = (value: number) => {
   return value === 0 ? "" : value.toString();
};

export const resetSearch = (search: any) => {
   search.resetSearch();
   if (search.priceRange[0] !== 0 || search.priceRange[1] !== MAX_PRICE) {
      search.updateSearch("priceRange", [0, MAX_PRICE]);
   }
};

export function getUserLevel(): number | null {
   if (typeof window !== "undefined") {
      const userString = localStorage.getItem("user");
      if (userString) {
         try {
            const user = JSON.parse(userString);
            return user.userLevel ?? null;
         } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return 10;
         }
      }
   }
   return 10;
}
