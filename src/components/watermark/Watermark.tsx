import NextImage, { StaticImageData } from "next/image";

import tizaraaSeal from "../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";

/**
 * The page background seal, in one place.
 *
 * Swap WATERMARK_IMAGE for a different file, or set it to null to take the seal
 * off every page at once. Pages that need their own image or placement can pass
 * props instead of changing the defaults here.
 */
export const WATERMARK_IMAGE: StaticImageData | string | null = tizaraaSeal;

type WatermarkProps = {
  src?: StaticImageData | string | null;
  /** Where the seal sits in the viewport — the homepage rides lower at 70%. */
  top?: string;
  /** Vertical nudge from that point — pages used -20%, -25% or -50%. */
  offsetY?: string;
  opacity?: number;
  maxWidth?: string;
  alt?: string;
};

export default function Watermark({
  src = WATERMARK_IMAGE,
  top = "50%",
  offsetY = "-20%",
  opacity = 0,
  maxWidth = "1200px",
  alt = "watermark",
}: WatermarkProps) {
  if (!src) return null;

  return (
    <NextImage
      alt={alt}
      src={src}
      priority
      width={1200}
      height={1200}
      style={{
        position: "fixed",
        top,
        left: "50%",
        transform: `translate(-50%, ${offsetY})`,
        width: "100%",
        height: "auto",
        maxWidth,
        opacity,
        zIndex: 0,
      }}
    />
  );
}
