import { useState } from "react";
import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";


export default function useStoryblok() {
  const [storyblok] = useState(() => {
    storyblokInit({
      accessToken: "iuRedZhrmR5X5glsD7iXNwtt",
      use: [apiPlugin],
      apiOptions: {
        region: "us",
      }
    });

    return getStoryblokApi()
  });

  return {
    storyblok,
  };
}
