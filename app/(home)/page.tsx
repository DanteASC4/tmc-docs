import Link from 'next/link';

export const metadata = {
  title: 'Nanocharts - Lightweight SVG Charts',
  description: 'Landing page for Nanocharts, a lightweight SVG chart library.',
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 125"
        height="125"
        width="300"
        className="size-12">
        <defs>
          <linearGradient gradientTransform="rotate(90,0.5,0.5)" id="kNzTu0So">
            <stop stopColor="#00ffff" offset="0%" />
            <stop stopColor="#00ffff" offset="33.33333333333333%" />
            <stop stopColor="#dd0547" offset="66.66666666666666%" />
            <stop stopColor="#dd0547" offset="100%" />
          </linearGradient>
          <mask id="e59VKrn8">
            <rect fill="#000000" height="100%" width="100%" y="0" x="0" />
            <rect height="100" width="30" y="0" x="15" fill="#ffffff" />
            <rect height="97" width="30" y="0" x="75" fill="#ffffff" />
            <rect height="110" width="30" y="0" x="135" fill="#ffffff" />
            <rect height="116" width="30" y="0" x="195" fill="#ffffff" />
            <rect height="101" width="30" y="0" x="255" fill="#ffffff" />
          </mask>
        </defs>
        <rect
          mask="url('#e59VKrn8')"
          fill="url('#kNzTu0So')"
          height="100%"
          width="100%"
          y="0"
          x="0"
        />
        <g className="nc-bargroup">
          <rect height="100" width="30" y="0" x="15" fill="transparent" />
          <rect height="97" width="30" y="0" x="75" fill="transparent" />
          <rect height="110" width="30" y="0" x="135" fill="transparent" />
          <rect height="116" width="30" y="0" x="195" fill="transparent" />
          <rect height="101" width="30" y="0" x="255" fill="transparent" />
        </g>
        <g className="nc-textgroup">
          <text y="115" x="22.5" fill="transparent" />
          <text y="112" x="82.5" fill="transparent" />
          <text y="125" x="142.5" fill="transparent" />
          <text y="131" x="202.5" fill="transparent" />
          <text y="116" x="262.5" fill="transparent" />
        </g>
      </svg>
      <h1 className="mb-4 text-2xl font-bold">Nanocharts</h1>
      <p className="text-fd-muted-foreground">
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline">
          Check out the docs!
        </Link>
      </p>
    </main>
  );
}
