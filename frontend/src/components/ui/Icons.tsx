import { SVGProps } from "react";

export function LotusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Center Petal */}
      <path d="M12 20 C 8 16, 8 7, 12 2 C 16 7, 16 16, 12 20 Z" />
      {/* Inner Left Petal */}
      <path d="M 9.5 12.5 C 6 11, 4 8, 3 5 C 5 11, 8 16, 12 20" />
      {/* Inner Right Petal */}
      <path d="M 14.5 12.5 C 18 11, 20 8, 21 5 C 19 11, 16 16, 12 20" />
      {/* Outer Left Petal */}
      <path d="M 8.5 16.5 C 5 16, 2 15, 1 13 C 3 16, 7 19, 12 20" />
      {/* Outer Right Petal */}
      <path d="M 15.5 16.5 C 19 16, 22 15, 23 13 C 21 16, 17 19, 12 20" />
      {/* Base Stem */}
      <path d="M 12 20 V 23" />
    </svg>
  );
}

export function WoodenFishIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Mõ Body */}
      <circle cx="10" cy="13" r="8" />
      
      {/* The slit opening (Mệng mõ) */}
      <path d="M5 15c2 1 8 1 10 0" />
      <circle cx="4" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" stroke="none" />
      
      {/* Carved scales (Vảy cá) */}
      <path d="M7 10a3 3 0 0 1 6 0" />
      <path d="M10 10v2" />
      
      {/* The Mallet (Dùi mõ) */}
      <path d="M22 2l-6 6" strokeWidth="2.5" />
      <circle cx="15" cy="9" r="2.5" fill="currentColor" stroke="none" />
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
