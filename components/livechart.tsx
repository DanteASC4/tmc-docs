'use client';

import { Sandpack } from '@codesandbox/sandpack-react';
import { useEffect, useRef, useState } from 'react';

export function LiveChart({ initialCode }: { initialCode: string }) {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasScrolledIntoView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '150px',
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const css = `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

#app {
  width: 100%;
  height: 100%;
  background: #000000;
}`;

  return (
    <div ref={containerRef} style={{ minHeight: '400px' }} className="my-6">
      {hasScrolledIntoView ? (
        <Sandpack
          template="vanilla-ts"
          theme="dark"
          customSetup={{
            dependencies: {
              '@jgmc/vanilla': '^0.5.0',
            },
          }}
          files={{
            '/index.ts': initialCode,
            '/index.css': css,
            '/index.html': `<div id="app"></div>`,
          }}
          options={{
            showLineNumbers: true,
            editorHeight: 400,
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-100 border border-gray-700 rounded-md bg-gray-900 text-gray-400 animate-pulse">
          Loading interactive playground...
        </div>
      )}
    </div>
  );
}
