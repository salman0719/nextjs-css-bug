export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
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
