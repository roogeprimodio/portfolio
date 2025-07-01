
import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  const iconSymbolColor = '#FFFFFF'; // White for high contrast
  const backgroundColor = '#08081F'; // A dark charcoal that works on light and dark backgrounds

  return new ImageResponse(
    (
      <div
        style={{
          background: backgroundColor,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="75%" height="75%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 50 Q 50 10 90 50" stroke={iconSymbolColor} strokeWidth="10" strokeLinecap="round" />
          <path d="M 10 50 Q 50 90 90 50" stroke={iconSymbolColor} strokeWidth="10" strokeLinecap="round" />
          <circle cx="50" cy="50" r="15" fill={iconSymbolColor} />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
