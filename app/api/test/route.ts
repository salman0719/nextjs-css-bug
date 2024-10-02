import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  console.log(req.nextUrl.searchParams.toString());

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
