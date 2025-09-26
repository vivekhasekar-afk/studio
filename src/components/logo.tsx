import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 20V10a2 2 0 0 0-2-2h-3.37a2 2 0 0 0-1.26.47L5 12V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v10" />
      <path d="M12 10a2 2 0 0 0-2 2v8" />
      <path d="M12 10h1.5a2.5 2.5 0 0 1 0 5H12" />
      <path d="M17.5 18a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
      <path d="M19 15.5h-3" />
    </svg>
  );
}
