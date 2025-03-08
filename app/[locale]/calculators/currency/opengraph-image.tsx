import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Currency Converter | Calculator Hub';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { locale: string } }) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom right, #0ea5e9, #8b5cf6)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            {/* Currency symbols */}
            <span
              style={{
                fontSize: '72px',
                color: 'white',
                marginRight: '24px',
              }}
            >
              $€¥£
            </span>
          </div>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}
          >
            Currency Converter
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: 'white',
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Convert between different currencies with real-time exchange rates
          </p>
          <div
            style={{
              position: 'absolute',
              bottom: '48px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                color: 'white',
                opacity: 0.8,
              }}
            >
              calculator-hub.com
            </span>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
} 