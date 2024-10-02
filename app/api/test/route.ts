import { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_: NextRequest): Promise<Response> {
  return new Response(
    JSON.stringify({
      random: (Math.random() * 100).toFixed(6),
      message: 'This data is cached - ' + new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=120, stale-while-revalidate=60',
        'CDN-Cache-Control': 's-maxage=120, stale-while-revalidate=60',
        'Content-Type': 'application/json',
      },
    }
  );
}
