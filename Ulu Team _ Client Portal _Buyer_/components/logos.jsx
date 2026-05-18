// Ulu Team + GEM Mortgage logos — refined

const UluLogo = ({ variant = 'color', size = 'md', maxWidth }) => {
  // 747×300 (≈2.49:1) — needs to be tall enough to read the tagline
  const h = size === 'lg' ? 110 : size === 'sm' ? 56 : 78;
  // variant='white' → inverts for dark backgrounds (admin top bar, login hero)
  const filter = variant === 'white' ? 'brightness(0) invert(1)' : 'none';
  return (
    <img
      src="assets/ulu-logo.png"
      alt="The Ulu Team — Real Estate Services with Aloha"
      style={{ height: h, width: 'auto', maxWidth: maxWidth || 'none', display: 'block', filter, objectFit: 'contain', alignSelf: 'flex-start', flex: 'none' }}
    />
  );
};

const GemLogo = ({ size = 'md', compact = false }) => {
  // 1000×313 (≈3.2:1) — wider than tall, needs generous height
  const h = size === 'lg' ? 92 : size === 'sm' ? 46 : 68;
  return (
    <img
      src="assets/gem-logo.png"
      alt="GEM Mortgage — A Division of Golden Empire Mortgage, Inc."
      style={{ height: h, width: 'auto', display: 'block', alignSelf: 'flex-start', flex: 'none' }}
    />
  );
};

// Decorative ulu leaf motif for backgrounds
const UluLeaf = ({ size = 100, color = 'rgba(179,32,37,0.06)', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <path d="M50 10 C 68 18, 78 36, 78 56 C 78 72, 66 84, 50 86 C 34 84, 22 72, 22 56 C 22 36, 32 18, 50 10 Z"
          fill={color} />
    <path d="M50 10 L 50 86 M 28 32 L 72 72 M 72 32 L 28 72" stroke={color} strokeWidth="1" opacity="0.6" fill="none" />
  </svg>
);

Object.assign(window, { UluLogo, GemLogo, UluLeaf });
