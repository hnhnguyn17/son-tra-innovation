import { useState } from 'react';
export type OceanArtworkName = 'coast' | 'harbor' | 'whale';
const names: OceanArtworkName[] = ['coast', 'harbor', 'whale'];

// Retain decoded scenes after first visit, but do not fetch every image on QR entry.
export function OceanArtwork({ name, loaded, onLoad, onError }: {
  name: OceanArtworkName;
  loaded: OceanArtworkName[];
  onLoad: (name: OceanArtworkName) => void;
  onError: (name: OceanArtworkName) => void;
}) {
  const [visibleName, setVisibleName] = useState<OceanArtworkName | null>(null);
  if (loaded.includes(name) && visibleName !== name) setVisibleName(name);
  return <div className="ocean-artworks">
    {names.filter(item => loaded.includes(item) || item === name).map(item => (
      <picture key={item} className="ocean-artwork" data-visible={loaded.includes(item) && visibleName === item} data-artwork={item}>
        <source media="(max-width: 767px)" srcSet={`/assets/ocean/${item}-960.webp`} />
        <img src={`/assets/ocean/${item}-1536.webp`} alt="" width="1536" height="1024"
          decoding="async" fetchPriority={item === 'coast' ? 'high' : 'auto'}
          onLoad={async event => {
            const image = event.currentTarget;
            try { await image.decode(); onLoad(item); } catch { onError(item); }
          }} onError={() => onError(item)} />
      </picture>
    ))}
  </div>;
}
