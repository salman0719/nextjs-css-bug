'use client';

import Link from 'next/link';
import rootStyles from '../test.module.css';
import styles from './nestedTest.module.css';
import { usePathname } from 'next/navigation';

export default function Home() {
  const path = usePathname()

  return (
    <div className={"w-dvw h-dvh flex text-2xl items-center justify-center flex-col flex-wrap"}>
      <span className={`${rootStyles.text}  ${styles.text}`}>
        Current path - <i>{path}</i>
      </span>
      <div className='flex gap-4 items-center flex-col sm:flex-row'>
        <Link
          href="/"
          className="mt-2 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Back to Home
        </Link>
        <Link
          href="/test"
          className="mt-2 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Back to Test
        </Link>
      </div>
    </div>
  );
}
