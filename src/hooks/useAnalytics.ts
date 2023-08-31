import { AnalyticsBrowser } from "@segment/analytics-next";
import { useState } from "react";

export default function useAnalytics() {
  const [analytics] = useState(() => {
    return AnalyticsBrowser.load({
      writeKey: "y46ko1YXiCZwyGtPGlAppg3pgfcCDSHr",
    });
  });

  return {
    analytics,
  };
}
