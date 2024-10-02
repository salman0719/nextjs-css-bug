export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
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
