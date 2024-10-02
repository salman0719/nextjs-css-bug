import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = req.nextUrl;

  return new Response(
    JSON.stringify({
      searchParams: searchParams.toString(),
      random: (Math.random() * 100).toFixed(6),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
