'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export default function AdsSquare() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading AdSense:', err);
    }
  }, []);

  return (
    <aside className="my-4 w-full md:my-8">
      {/* Advertisement label */}
      <div className="mb-1 text-center text-[10px] font-medium uppercase leading-4 text-gray-500">
        Advertisement
      </div>

      {/* Ad container */}
      <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        <ins
          className="adsbygoogle block min-h-[250px] w-full"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3799479098488751"
          data-ad-slot="4078051890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
