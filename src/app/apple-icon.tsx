
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
  return new ImageResponse(
    (
      <div
        style={{
          background: '#4B0082', // Deep indigo from the theme
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px', // Standard Apple icon corner radius
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 50 Q 50 10 90 50" stroke="white" strokeWidth="10" strokeLinecap="round" />
          <path d="M 10 50 Q 50 90 90 50" stroke="white" strokeWidth="10" strokeLinecap="round" />
          <circle cx="50" cy="50" r="15" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
