import { COURSE_TEST_DATA_QUERY_KEY } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log('API searchParams', req.nextUrl.searchParams.toString());

  const { searchParams } = req.nextUrl;

  try {
    if (searchParams.has(COURSE_TEST_DATA_QUERY_KEY)) {
      const res = await fetch(
        'https://nda-test-2.s3.us-west-1.amazonaws.com/temp/good-sample.json.gz'
      );
      console.log('res.ok', res.ok);
      const data = [
        { searchParams: searchParams.toString() },
        { random: Math.random() },
        ...(await res.json()),
      ];

      return NextResponse.json(data);
    }
  } catch (err) {
    // TEMP
    console.error('From API', err);

    return NextResponse.json({
      searchParams: searchParams.toString(),
      message: 'Failed to perform operation.',
    });
  }

  return NextResponse.json({
    searchParams: searchParams.toString(),
    message: 'No data received',
  });
}
