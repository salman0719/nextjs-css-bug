import {
  COURSE_FILTER_KEYS,
  COURSE_TEST_DATA_QUERY_KEY,
} from '@/utils/constants';
import { getSearchQuery } from '@/utils/helper';
import { headers } from 'next/headers';

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
  const query = getPartialFetchQuery(searchParams);

  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';

  const url =
    protocol + '://' + host + '/api/course-test-2' + (query ? '?' + query : '');

  // TEMP
  console.log('url', url);

  const data: string | undefined = await new Promise((resolve) => {
    fetch(url, { next: { revalidate: 0 } })
      // TEMP
      .then((res) => res.text())
      // .then((res) => res.json())
      .then((res) => {
        // TEMP
        // resolve(JSON.stringify(res, null, 2));
        resolve(JSON.stringify(JSON.parse(res), null, 2));
      })
      .catch((err) => {
        console.error('From SSR', err);
        resolve(
          JSON.stringify({
            message: 'Error occurred!',
            err,
          })
        );
      });
  });

  return <pre style={{ padding: 15, boxSizing: 'border-box' }}>{data}</pre>;
};

export default CourseTestPage;
