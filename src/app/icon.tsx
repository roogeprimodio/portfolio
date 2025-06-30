
import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 16,
  height: 16,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  // A vibrant blue that is visible on both light and dark backgrounds.
  const iconColor = '#3655D5'; 

  return new ImageResponse(
    (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 10 50 Q 50 10 90 50" stroke={iconColor} strokeWidth="12" strokeLinecap="round" />
        <path d="M 10 50 Q 50 90 90 50" stroke={iconColor} strokeWidth="12" strokeLinecap="round" />
        <circle cx="50" cy="50" r="15" fill={iconColor} />
      </svg>
    ),
    {
      ...size,
    }
  );
}
