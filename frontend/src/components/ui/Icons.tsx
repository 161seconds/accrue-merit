import { SVGProps } from "react";

export function LotusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="petalDark" x1="64" y1="18" x2="64" y2="100">
          <stop offset="0%" stopColor="#ff5f9f" />
          <stop offset="100%" stopColor="#f43f86" />
        </linearGradient>

        <linearGradient id="petalMid" x1="64" y1="32" x2="64" y2="104">
          <stop offset="0%" stopColor="#ff8fbc" />
          <stop offset="100%" stopColor="#f85f9e" />
        </linearGradient>

        <linearGradient id="petalLight" x1="64" y1="42" x2="64" y2="106">
          <stop offset="0%" stopColor="#ffd0e2" />
          <stop offset="100%" stopColor="#ff9fc6" />
        </linearGradient>

        <linearGradient id="leafGreen" x1="64" y1="86" x2="64" y2="122">
          <stop offset="0%" stopColor="#7ac943" />
          <stop offset="100%" stopColor="#4f9f2f" />
        </linearGradient>
      </defs>

      {/* Outer petals */}
      <path
        d="M64 101C34 94 19 70 16 38C39 37 59 57 64 101Z"
        fill="url(#petalDark)"
      />
      <path
        d="M64 101C94 94 109 70 112 38C89 37 69 57 64 101Z"
        fill="url(#petalDark)"
      />

      <path
        d="M64 101C42 84 36 52 47 24C68 29 78 67 64 101Z"
        fill="url(#petalDark)"
      />
      <path
        d="M64 101C86 84 92 52 81 24C60 29 50 67 64 101Z"
        fill="url(#petalDark)"
      />

      {/* Top center petal */}
      <path
        d="M64 101C43 73 47 35 64 12C81 35 85 73 64 101Z"
        fill="url(#petalMid)"
      />

      {/* Inner light petals */}
      <path
        d="M64 103C42 95 27 76 27 54C45 58 62 75 64 103Z"
        fill="url(#petalLight)"
      />
      <path
        d="M64 103C86 95 101 76 101 54C83 58 66 75 64 103Z"
        fill="url(#petalLight)"
      />

      {/* Center petal */}
      <path
        d="M64 104C49 84 51 54 64 36C77 54 79 84 64 104Z"
        fill="url(#petalMid)"
      />

      {/* Leaves / base */}
      <path
        d="M64 101C44 117 22 110 11 95C29 82 52 86 64 101Z"
        fill="url(#leafGreen)"
      />
      <path
        d="M64 101C84 117 106 110 117 95C99 82 76 86 64 101Z"
        fill="url(#leafGreen)"
      />
      <path
        d="M64 99C73 106 75 116 64 124C53 116 55 106 64 99Z"
        fill="url(#leafGreen)"
      />
    </svg>
  );
}

export function WoodenFishIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="woodBody" x1="26" y1="30" x2="94" y2="106">
          <stop offset="0%" stopColor="#D99A4E" />
          <stop offset="55%" stopColor="#A9652E" />
          <stop offset="100%" stopColor="#6F3B1F" />
        </linearGradient>

        <linearGradient id="woodLight" x1="42" y1="24" x2="84" y2="94">
          <stop offset="0%" stopColor="#F0B86A" />
          <stop offset="100%" stopColor="#B86C32" />
        </linearGradient>

        <linearGradient id="malletWood" x1="82" y1="18" x2="116" y2="54">
          <stop offset="0%" stopColor="#E5B066" />
          <stop offset="100%" stopColor="#8A4D28" />
        </linearGradient>

        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="4"
            floodColor="#000000"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      {/* Mallet handle */}
      <path
        d="M86 42L116 12"
        stroke="url(#malletWood)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Mallet head */}
      <circle
        cx="80"
        cy="48"
        r="14"
        fill="url(#malletWood)"
        filter="url(#softShadow)"
      />

      <circle cx="75" cy="43" r="5" fill="#F2C17A" opacity="0.7" />

      {/* Wooden fish body */}
      <path
        d="M18 72C18 43 40 26 63 28C88 30 106 49 106 74C106 98 86 113 62 113C36 113 18 96 18 72Z"
        fill="url(#woodBody)"
        filter="url(#softShadow)"
      />

      {/* Top raised part */}
      <path
        d="M38 58C43 38 59 31 74 38C89 45 94 61 90 77C79 66 55 61 38 58Z"
        fill="url(#woodLight)"
        opacity="0.9"
      />

      {/* Mouth slit */}
      <path
        d="M30 78C45 88 78 89 96 77"
        stroke="#3B1E12"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <path
        d="M33 76C48 82 77 83 93 75"
        stroke="#8C4A28"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Side holes */}
      <circle cx="34" cy="74" r="9" fill="#3B1E12" />
      <circle cx="92" cy="74" r="9" fill="#3B1E12" />

      <circle cx="32" cy="71" r="3" fill="#7A4326" opacity="0.8" />
      <circle cx="90" cy="71" r="3" fill="#7A4326" opacity="0.8" />

      {/* Fish scale / carved marks */}
      <path
        d="M50 56C55 47 70 47 76 56"
        stroke="#5A2E1B"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M63 56V68"
        stroke="#5A2E1B"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M47 91C56 97 73 98 84 91"
        stroke="#5A2E1B"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Wood grain */}
      <path
        d="M42 43C50 39 62 39 70 44"
        stroke="#F3C17A"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />

      <path
        d="M30 63C40 57 52 58 62 63"
        stroke="#F3C17A"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />

      <path
        d="M70 101C80 101 88 97 94 90"
        stroke="#F3C17A"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Bottom darker base */}
      <path
        d="M27 91C42 107 75 111 96 91C89 106 75 115 61 115C43 115 30 105 27 91Z"
        fill="#5B2E1A"
        opacity="0.28"
      />
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
