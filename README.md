# Homepage — component breakdown

Matches the layout in both screenshots (desktop + mobile), rebuilt with a dark-blue
palette on a light background. Drop the `src/` folder into your project — paths
assume the same structure as your existing `Home.jsx` (`components/`, `data/`, `pages/`).

## Files

```
src/
├── data/
│   └── homeData.js          # every array/object the sections loop over
├── components/
│   ├── Navbar.jsx            # top nav, desktop links + mobile hamburger
│   ├── HeroSlider.jsx        # "Vision Possible" banner, prev/next + dots
│   ├── GivingWidget.jsx      # quick amounts, custom value, giving type, Give button
│   ├── BioSection.jsx        # tokenized heading (for highlighted phrases) + paragraphs
│   ├── FeatureCard.jsx       # single card (image, title, description, link)
│   ├── FeatureCardsSection.jsx  # loops FeatureCard over Partnership/Resources/Worship
│   ├── CredentialsSection.jsx   # accolades list + Read More
│   ├── WorshipShowcase.jsx      # script tagline + portrait photo
│   ├── ServiceTimesSection.jsx  # rotating multi-language headline + schedule loop
│   ├── ResourcesApps.jsx        # Glorious TV / Glorious FM cards, loops resourceApps
│   ├── LionSection.jsx          # video promo block with play overlay
│   ├── PillarCard.jsx           # single pillar card (logo, title, link)
│   └── PillarsCarousel.jsx      # scrollable row of PillarCard, loops pillars
└── pages/
    └── Home.jsx               # assembles every section in order
```

Every list you saw repeated in the screenshots (nav links, hero slides, quick-give
amounts, credentials, service times, apps, pillars) is an array in `homeData.js` —
nothing is hardcoded in the JSX, so you can wire it to an API/CMS later without
touching the components.

## Color palette (dark blue, light theme)

| Role                          | Hex        |
|--------------------------------|-----------|
| Navy — hero / dark sections     | `#0a1628` / `#0c1322` |
| Deep blue — giving widget bg    | `#123a6b` |
| Primary blue — links, buttons   | `#1d4ed8` |
| Blue tint — credentials bg      | `#e7effb` |
| Body text                       | `gray-500`/`gray-600` |
| Page background                 | `white` |

The red "Give" / "Pledge a Seat" buttons were kept as-is since a donation CTA
usually needs to stay a distinct, urgent color even inside a blue palette — say
the word if you'd rather these be blue too.

## Before you wire it in

1. `lucide-react` and `react-router-dom` are used the same way as your existing
   `Home.jsx` — no new dependencies.
2. All images/logos in `homeData.js` are placeholder URLs (Unsplash / placehold.co).
   Swap them for your real assets the same way your current file imports
   `homeImage from '../assets/images/homeimg.jpg'`.
3. `PillarsCarousel` and `Navbar`'s mobile menu use `hide-scrollbar`, which your
   existing `Home.jsx` already references — no extra CSS needed if that class is
   already in your stylesheet.
4. `GivingWidget` and `ServiceTimesSection` hold local UI state (selected amount,
   rotating tagline) — swap in real submit/payment logic when you connect a backend.