
import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
  const iconColor = '#3655D5'; // A vibrant blue
  const backgroundColor = '#FFFFFF'; // Apple recommends a solid background for apple-touch-icon

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
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 50 Q 50 10 90 50" stroke={iconColor} strokeWidth="10" strokeLinecap="round" />
          <path d="M 10 50 Q 50 90 90 50" stroke={iconColor} strokeWidth="10" strokeLinecap="round" />
          <circle cx="50" cy="50" r="15" fill={iconColor} />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
