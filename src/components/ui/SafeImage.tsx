"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image with a graceful fallback. The product images are Unsplash
 * placeholders — if one fails to load, we swap to a subtle on-brand
 * gradient so the layout never breaks. Remove the fallback once the client
 * uploads their own guaranteed-valid photos.
 */
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'>
       <rect width='100%' height='100%' fill='#141416'/>
       <text x='50%' y='50%' fill='#3a382f' font-family='Georgia,serif' font-size='30'
         text-anchor='middle' dominant-baseline='middle' letter-spacing='4'>OBID SOBITOV</text>
     </svg>`,
  );

export function SafeImage(props: ImageProps) {
  const [errored, setErrored] = useState(false);
  const { src, alt, ...rest } = props;
  return (
    <Image
      src={errored ? FALLBACK : src}
      alt={alt}
      onError={() => setErrored(true)}
      unoptimized={errored}
      {...rest}
    />
  );
}
