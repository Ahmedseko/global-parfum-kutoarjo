---
name: Aroma Finance
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#ffb0cd'
  on-secondary: '#640039'
  secondary-container: '#aa0266'
  on-secondary-container: '#ffbad3'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style
This design system embodies a dark-first, high-precision financial instrument tailored for modern Indonesian artisanal perfume houses and fragrance entrepreneurs (UMKM Toko Aroma Wangi). It fuses the focused utility of developer tools (inspired by the Raycast aesthetic) with the sensory sophistication of haute perfumery. 

The aesthetic is characterized by deep layered obsidian canvases, razor-sharp 1px glassmorphic boundaries, localized Indonesian terminology (e.g., *Arus Kas*, *Laba Bersih*, *Harga Pokok Penjualan*, *Formulasi*), and ethereal atmospheric glows reminiscent of diffused aromatic mists (violet, velvet orchid, and warm amber). Interfaces feel analytical yet luxurious, elevating everyday MSME bookkeeping, raw ingredient costings, and batch inventory into an executive command center.

## Colors
The palette relies on a tonal hierarchy of dark obsidian and charcoal bases, highlighted by chromatic glows and high-contrast typography:

- **Canvas & Surfaces:**
  - Base Background: `#08090A`
  - Surface Card / Tier 1: `#101114`
  - Elevated Container / Hover Tier 2: `#14151A`
  - Modal / Popover Tier 3: `#1A1B22`
  - Border Glass Line: `rgba(255, 255, 255, 0.08)`
  - Active / Focus Border: `rgba(139, 92, 246, 0.4)`

- **Brand & Accents:**
  - Primary (Orchid Violet): `#8B5CF6` (Used for primary CTA, active navigation, key data trends)
  - Primary Accent Glow: `#A855F7`
  - Secondary (Rose Petal Pink): `#EC4899` (Used for compounding margins, rare ingredient tags)
  - Tertiary (Warm Amber Glow): `#F59E0B` (Used for low-stock batch warnings, aged maceration alerts)

- **Financial Telemetry:**
  - Positive (Pemasukan / Untung): `#10B981` (Soft Emerald) with soft glow `rgba(16, 185, 129, 0.15)`
  - Negative (Pengeluaran / Rugi): `#F43F5E` (Soft Rose Red) with soft glow `rgba(244, 63, 94, 0.15)`

- **Typography & Neutrals:**
  - Crisp High-Contrast Text: `#F7F7F8`
  - Secondary / Muted Labels: `#9CA3AF`
  - Tertiary / Placeholder Text: `#52525B`

## Typography
Typographic discipline maintains the Raycast developer-tool ethos while handling complex financial figures. 

- **Geist** provides modern neutral sans-serif qualities for headers, labels, and Indonesian UI strings, retaining legibility at compact scales.
- **JetBrains Mono** is strictly deployed for Indonesian Rupiah amounts (`Rp 148.500.000`), stock SKUs, batch identifiers (`BATCH-2024-OOD`), inventory quantities (e.g., `500 ml`), and telemetry deltas (`+14.8%`).
- Numbers must always render with tabular lining (`tnum`) to ensure strict vertical column alignment in accounting ledgers.

## Layout & Spacing
The layout leverages a compact, high-density fluid grid engineered for desktop control rooms and adaptive tablet/mobile point-of-sale inspections:

- **Desktop (1024px+):** Fixed 260px collapsible command sidebar with a fluid 12-column content grid, `1.5rem` gutters, and `2.5rem` outer canvas padding.
- **Tablet (768px - 1023px):** Compact 8-column layout, `1rem` gutters, and `1.5rem` canvas margins. Collapsible rail navigation.
- **Mobile (<768px):** Single-column stacked presentation with `1rem` edge margins. Primary financial KPI cards transform into a swipeable carousel or unified stack.
- Internal component rhythm follows a strict 4px sub-grid, optimizing data density so MSME owners can assess HPP (Harga Pokok Penjualan), gross margins, and inventory turns on a single screen without excessive scrolling.

## Elevation & Depth
Depth in this design system is conveyed via dark translucent layering, subtle inner hairbars, and atmospheric backlights:

- **Surface Tiers:**
  - **Tier 0 (Canvas):** `#08090A` flat.
  - **Tier 1 (Cards & Data Tables):** Background `rgba(16, 17, 20, 0.75)` with `backdrop-filter: blur(16px)` and an outer 1px stroke of `rgba(255, 255, 255, 0.08)`.
  - **Tier 2 (Hover States & Active Rows):** `#14151A` with top border highlight `rgba(255, 255, 255, 0.12)`.
  - **Tier 3 (Modals, Command K-Bar, Popovers):** `#1A1B22` with diffuse shadow `0 20px 40px -10px rgba(0, 0, 0, 0.7)`.
- **Atmospheric Glows:** Strategic gradient radial lights (`radial-gradient(circle at top right, rgba(139, 92, 246, 0.12), transparent 60%)`) highlight prominent stat cards (e.g., *Total Omset Bulan Ini*).
- **Geometric Watermarks:** Ultra-subtle (3% opacity) SVG wireframe outlines of perfume flacons and distillation coils ground the thematic domain within empty states and card headers.

## Shapes
The system implements a refined, surgical corner language (`roundedness: 1`). 

- Default elements (Buttons, Inputs, Metric Badges): `0.25rem` (4px).
- Cards, Table Containers, and Modals: `0.5rem` (8px).
- Status Pills & Currency Indicator Tags: `9999px` (Full Pill) for contrast against structural grid lines.
- The tight radii mirror premium hardware surfaces, avoiding playful or bubble-like contours to preserve an authoritative, disciplined financial posture.

## Components

- **Buttons:**
  - *Primary (Aksi Utama):* Background `#8B5CF6`, text `#FFFFFF`, subtle inset top shadow `inset 0 1px 0 rgba(255, 255, 255, 0.25)`. Hover: `#7C3AED` with `0 0 16px rgba(139, 92, 246, 0.35)` glow.
  - *Secondary (Sekunder):* Background `rgba(255, 255, 255, 0.04)`, border `1px solid rgba(255, 255, 255, 0.08)`, text `#F7F7F8`. Hover: Background `rgba(255, 255, 255, 0.08)`.
  - *Ghost:* Background transparent, text `#9CA3AF`. Hover: text `#F7F7F8`, background `rgba(255, 255, 255, 0.04)`.

- **Cards (Kartu Metrik & Keuangan):**
  - Frosted glass container (`#101114` at 85% opacity, `backdrop-filter: blur(12px)`), bordered by `1px solid rgba(255, 255, 255, 0.08)`.
  - Padding: `1rem` or `1.5rem`.
  - Card titles feature small uppercase tracked labels in `#9CA3AF` with mono-spaced numeric figures in `#F7F7F8`.

- **Input Fields (Kolom Input):**
  - Background `#08090A`, border `1px solid rgba(255, 255, 255, 0.1)`, text `#F7F7F8`, placeholder `#52525B`.
  - Height: 36px (compact) or 40px (standard).
  - Focus state: Border transitions to `#8B5CF6`, paired with an outer box-shadow ring `0 0 0 1px rgba(139, 92, 246, 0.5)`. Prefix adornments (such as `Rp` or `ml`) styled in muted JetBrains Mono.

- **Chips & Badges (Lencana Status):**
  - Height: 20px to 24px; typography set in `label-sm`.
  - *Lunas / Untung (Paid / Profit):* `rgba(16, 185, 129, 0.1)` background, `#10B981` border and text.
  - *Jatuh Tempo (Pending/Overdue):* `rgba(244, 63, 94, 0.1)` background, `#F43F5E` border and text.
  - *Dalam Proses Maserasi (Maceration in progress):* `rgba(245, 158, 11, 0.1)` background, `#F59E0B` border and text.

- **Lists & Data Tables (Tabel Pembukuan):**
  - Header row: `#08090A` background with `1px solid rgba(255, 255, 255, 0.08)` border-bottom, text uppercase `label-sm` in `#9CA3AF`.
  - Rows: Height 48px, zebra-free, alternating subtle divider `1px solid rgba(255, 255, 255, 0.04)`.
  - Hover row: Background `#14151A`. Rupiah figures strictly right-aligned using `JetBrains Mono`.

- **Formulation & Batch Cards (Komponen Khusus Parfum):**
  - Breakdown meters displaying alcohol-to-fragrance oil ratios (Konsentrasi Extrait / EDP / EDT) via segmented progress bars tinted with `#8B5CF6`, `#EC4899`, and `#F59E0B`.