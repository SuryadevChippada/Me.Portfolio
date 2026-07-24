import { useEffect } from "react";

// Warms the browser cache so the first hover onto an item with cover art
// never shows a blank flash while the image fetches.
export function usePreloadImages(urls: (string | null)[]) {
  useEffect(() => {
    const images = urls.filter((url): url is string => url !== null).map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });
    return () => {
      images.forEach((img) => {
        img.src = "";
      });
    };
  }, [urls]);
}
