import { useEffect, useRef, useState } from "react";

function useLazyImage(src) {
  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(image);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return {
    imageRef,
    imageSrc,
  };
}

export default useLazyImage;