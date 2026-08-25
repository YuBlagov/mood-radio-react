// Hand-drawn line-art illustrations, one per mood id — bold black outline,
// flat 1-2 color fill, matching the polaroid reference art direction.
// MoodBoard falls back to a plain color swatch when no entry exists for a
// given id, so these can be filled in one at a time without breaking anything.

const INK = "#211f1c";

export function HappyIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <circle cx="50" cy="50" r="32" fill="#f2c94c" stroke={INK} strokeWidth="3" />
      <circle cx="38" cy="44" r="4" fill={INK} />
      <circle cx="62" cy="44" r="4" fill={INK} />
      <path d="M34 60 Q50 76 66 60" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SadIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <path d="M20 42 Q20 22 40 22 Q46 12 58 18 Q75 14 78 34 Q90 38 84 52 Q84 60 72 60 L28 60 Q16 60 20 42Z" fill="#c9d6e8" stroke={INK} strokeWidth="3" />
      <path d="M32 68 L28 80 M50 68 L46 84 M68 68 L64 80" stroke="#6f8bb0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ChillIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <rect x="10" y="65" width="80" height="20" rx="4" fill="#7a9be0" stroke={INK} strokeWidth="2" />
      <rect x="15" y="45" width="16" height="24" rx="6" fill="#7a9be0" stroke={INK} strokeWidth="2" />
      <circle cx="45" cy="38" r="10" fill="#f2c9a0" stroke={INK} strokeWidth="2" />
      <path d="M35 38 a10 10 0 0 1 20 0" fill="none" stroke={INK} strokeWidth="3" />
      <circle cx="35" cy="40" r="4" fill={INK} />
      <circle cx="55" cy="40" r="4" fill={INK} />
      <rect x="40" y="48" width="10" height="20" fill="#e0567f" stroke={INK} strokeWidth="2" />
      <path d="M50 62 L75 55" stroke="#f2c9a0" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function EnergeticIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <circle cx="45" cy="28" r="11" fill={INK} />
      <rect x="38" y="38" width="14" height="28" fill="#e08a3f" stroke={INK} strokeWidth="2" />
      <path d="M52 45 L78 30 L82 55 L58 62 Z" fill="#c4692a" stroke={INK} strokeWidth="2" />
      <circle cx="70" cy="45" r="7" fill="#8a4a1a" stroke={INK} strokeWidth="2" />
      <path d="M34 44 L18 30 M34 50 L14 46" stroke={INK} strokeWidth="2" fill="none" />
    </svg>
  );
}

export function RomanticIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <path d="M50 78 C20 56 20 26 50 36 C80 26 80 56 50 78Z" fill="#e0567f" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function FocusIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <circle cx="50" cy="50" r="30" fill="#fff" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="50" r="18" fill="#8fd8d2" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="50" r="6" fill={INK} />
    </svg>
  );
}

export function PartyIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <circle cx="50" cy="42" r="20" fill="#e0e0e0" stroke={INK} strokeWidth="3" />
      <path d="M30 42h40M50 22v40M36 28l28 28M64 28 36 56" stroke={INK} strokeWidth="1.5" opacity="0.5" />
      <path d="M50 62 L50 78" stroke={INK} strokeWidth="2" />
      <circle cx="20" cy="75" r="4" fill="#e0567f" />
      <circle cx="35" cy="85" r="4" fill="#f2c94c" />
      <circle cx="65" cy="85" r="4" fill="#7a9be0" />
      <circle cx="80" cy="72" r="4" fill="#90c8ac" />
    </svg>
  );
}

export function YogaIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <circle cx="50" cy="30" r="10" fill="#f2c9a0" stroke={INK} strokeWidth="2" />
      <path d="M50 40 L50 58" stroke={INK} strokeWidth="3" />
      <path d="M50 44 Q28 50 24 68 Q40 66 50 58 Q60 66 76 68 Q72 50 50 44Z" fill="#caabd8" stroke={INK} strokeWidth="2" />
      <path d="M35 68 Q50 78 65 68" stroke={INK} strokeWidth="2" fill="none" />
    </svg>
  );
}

export function NostalgicIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <rect x="14" y="32" width="72" height="46" rx="6" fill="#90c8ac" stroke={INK} strokeWidth="3" />
      <circle cx="36" cy="55" r="12" fill="#fdfbf6" stroke={INK} strokeWidth="3" />
      <circle cx="64" cy="55" r="12" fill="#fdfbf6" stroke={INK} strokeWidth="3" />
      <circle cx="36" cy="55" r="3" fill={INK} />
      <circle cx="64" cy="55" r="3" fill={INK} />
      <rect x="42" y="40" width="16" height="6" fill="#fdfbf6" stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}

// For the special FAVORITES_CARD — shuffles the user's own Liked Songs.
// A plain gold star, same bold-outline language as the rest — the card's
// own scene background is white (see FAVORITES_CARD.color), so this reads
// as a real polaroid rather than a colored mood swatch.
export function FavoritesIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
      <path
        d="M50 20 L58 41 L80 42 L62 56 L69 78 L50 65 L31 78 L38 56 L20 42 L42 41 Z"
        fill="#f2c94c"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const ILLUSTRATIONS = {
  happy: HappyIllustration,
  sad: SadIllustration,
  chill: ChillIllustration,
  energetic: EnergeticIllustration,
  romantic: RomanticIllustration,
  focus: FocusIllustration,
  party: PartyIllustration,
  yoga: YogaIllustration,
  nostalgic: NostalgicIllustration,
  favorites: FavoritesIllustration,
};