import { AnalyticsBrowser } from "@segment/analytics-next";
import { useState } from "react";

export default function useAnalytics() {
  const [analytics] = useState(() => {
    return AnalyticsBrowser.load({
      writeKey: process.env.NEXT_PUBLIC_SEGMENT_KEY!,
    });
  });

  return {
    analytics,
  };
}
