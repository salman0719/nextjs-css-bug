import { COURSE_TEST_DATA_QUERY_KEY } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log(req.nextUrl.searchParams.toString());

  const { searchParams } = req.nextUrl;

  try {
    if (searchParams.has(COURSE_TEST_DATA_QUERY_KEY)) {
      const res = await fetch(
        'https://nda-test-2.s3.us-west-1.amazonaws.com/temp/good-sample.json'
      );

      const text = await res.text();
      console.log('text.substring(0, 100)', text.substring(0, 100));

      return NextResponse.json(JSON.parse(text));
    }
  } catch (err) {
    // TEMP
    console.error(err);

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
