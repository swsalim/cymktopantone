'use client';

import { useEffect } from 'react';

import { IndieBoosting } from '@indieboosting/react';

import { Container } from '@/components/container';
import { Wrapper } from '@/components/wrapper';

export default function IndieBoostingAds() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.indieboosting.com/latest/style.css';
    document.head.appendChild(link);
  }, []);

  return (
    <Wrapper>
      <Container>
        <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
          Check out These Products!
        </h2>
        <IndieBoosting id="SL9SI5AJME" noTitle direction="horizontal" noBorder noShadow />
      </Container>
    </Wrapper>
  );
}
