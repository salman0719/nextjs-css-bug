import {
  COURSE_FILTER_KEYS,
  COURSE_TEST_DATA_QUERY_KEY,
} from '@/utils/constants';
import { getSearchQuery } from '@/utils/helper';
// TEMP
// import { headers } from 'next/headers';

const getPartialFetchQuery = (
  searchParams: Record<string, string | string[]>
) =>
  getSearchQuery(
    searchParams,
    (key, value) =>
      [...COURSE_FILTER_KEYS, COURSE_TEST_DATA_QUERY_KEY].includes(key) &&
      !Array.isArray(value)
  );

const CourseTestPage: React.FC<{
  searchParams: Record<string, string | string[]>;
}> = async ({ searchParams }) => {
  // NOTE: DynamoDB is not ideal for complex queries, hence partial extraction
  // TEMP
  // const query = getPartialFetchQuery(searchParams);
  const query = getSearchQuery(searchParams);

  // TEMP
  // const headersList = headers();
  // const host = headersList.get('host');
  // const protocol = headersList.get('x-forwarded-proto') || 'http';

  // const url =
  // protocol + '://' + host + '/api/course-test-2' + (query ? '?' + query : '');

  const url =
    (process.env.NODE_ENV === 'production'
      ? 'https://nextjs-css-bug.vercel.app'
      : 'http://localhost:3000/') +
    '/api/course-test-2' +
    (query ? '?' + query : '');

  // TEMP
  console.log('url', url);

  const data: string | undefined = await new Promise((resolve) => {
    fetch(url, {
      next: {
        // revalidate: process.env.NODE_ENV === 'development' ? 0 : 60 * 1,
        revalidate: 60 * 1,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(JSON.stringify(res, null, 2));
      })
      .catch(() => resolve(undefined));
  });

  return <pre style={{ padding: 15, boxSizing: 'border-box' }}>{data}</pre>;
};

export default CourseTestPage;
