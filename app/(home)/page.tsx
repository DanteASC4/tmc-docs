import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Nanocharts - Lightweight SVG Charts',
  description: 'Landing page for Nanocharts, a lightweight SVG chart library.',
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center">
      <Image
        src="/imgs/dalogo.png"
        width={150}
        height={150}
        alt="nanocharts log"
      />
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
