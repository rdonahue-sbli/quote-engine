import type { CoverageAmount } from "~/schema/global";
import { CoverageAmountSchema } from "~/schema/global";

export default function useRates() {
  
  /**
   * Returns number of band to use to calculate rates
   * @param coverage Life insurance coverage amount
   * @returns number
   */
  function getBand(coverage: CoverageAmount) {
      if (coverage < 250_000) return 1
      if (coverage >= 250_000 && coverage < 500_000) return 2
      if (coverage >= 500_000 && coverage < 750_001) return 3
      if (coverage >= 750_001 && coverage < 1_000_000) return 4
      else return 5
  }

  /**
   * Calculates application fee
   * @param coverage Life insurance coverage amount
   * @returns 72 | 60
   * TODO: Add check if term > 1
   */
  function getFee(coverage: CoverageAmount) {
    if (coverage <= 1_000_000) return 72
    else return 60
  }


  return {
    getBand,
    getFee
  };
}
