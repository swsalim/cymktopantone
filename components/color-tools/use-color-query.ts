'use client';

import { useEffect, useRef } from 'react';

import {
  decodeColorSearch,
  encodeColorSearch,
  type ColorChannels,
  type ColorMode,
} from '@/lib/color-query';

/**
 * Read a color query once on the client, then keep the address bar in step
 * after the visitor changes the color. The page itself never reads searchParams.
 */
export function useColorQuery(
  mode: ColorMode,
  channels: ColorChannels,
  onHydrate: (next: { mode: ColorMode; channels: ColorChannels }) => void,
) {
  const hydrated = useRef(false);
  const dirty = useRef(false);
  const onHydrateRef = useRef(onHydrate);
  onHydrateRef.current = onHydrate;

  useEffect(() => {
    const fromQuery = decodeColorSearch(window.location.search);
    if (fromQuery) onHydrateRef.current(fromQuery);
    hydrated.current = true;
  }, []);

  const encoded = encodeColorSearch(mode, channels);

  useEffect(() => {
    if (!hydrated.current || !dirty.current || !encoded) return;
    const next = `?${encoded}`;
    if (window.location.search === next) return;
    window.history.replaceState(null, '', `${window.location.pathname}${next}${window.location.hash}`);
  }, [encoded]);

  return {
    markDirty() {
      dirty.current = true;
    },
  };
}
