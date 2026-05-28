import { SVGProps } from "react";

export function LotusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2c0 0-4 6-4 10s4 8 4 8 4-4 4-8-4-10-4-10z"/>
      <path d="M12 20c0 0 8-1 11-7-3-1-6 2-7 4"/>
      <path d="M12 20c0 0-8-1-11-7 3-1 6 2 7 4"/>
      <path d="M12 20c0 0 10 4 10 0-4 1-7-1-10-3"/>
      <path d="M12 20c0 0-10 4-10 0 4 1 7-1 10-3"/>
    </svg>
  );
}

export function WoodenFishIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Body */}
      <circle cx="12" cy="12" r="10" />
      {/* Slit */}
      <path d="M7 16a5 5 0 0 0 10 0" />
      <path d="M12 16v-6" />
      {/* Details/Eyes */}
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      {/* Stick hitting */}
      <path d="M22 2l-6 6" strokeWidth="2.5" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function PrayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22v-7" />
      <path d="M12 15C8 15 5 12 5 8c0-3 2-5 5-5h2" />
      <path d="M12 15c4 0 7-3 7-7 0-3-2-5-5-5h-2" />
      <path d="M12 3v5" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}
