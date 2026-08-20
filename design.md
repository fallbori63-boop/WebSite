# Books & Coffee Website Design Specification

> Reference: [Pressed Books & Coffee](https://www.pressedbooksandcoffee.com/)  
> Goal: reproduce the reference site's warm, editorial bookstore-cafe mood and long-form landing-page structure without copying its logo, photography, text, or other brand assets.

## 1. Design direction

Build a welcoming neighborhood bookstore and coffee-shop site that feels quiet, tactile, and community-led. The page should read like an editorial story rather than a software dashboard: large photography, restrained typography, generous vertical rhythm, and clear calls to visit, order, or attend an event.

Design keywords: `editorial`, `warm`, `independent`, `literary`, `unhurried`, `community`, `photography-led`.

The reference page currently uses this content sequence:

1. Header and primary navigation
2. Slim announcement bar
3. Full-width photographic hero with centered brand message
4. Welcome/about section with supporting store photography
5. Location and opening-hours section
6. Featured drinks/menu cards
7. Upcoming event cards
8. New-books promotional banner
9. Private-event inquiry section and form
10. Local-author submission section and form
11. Newsletter/footer area

## 2. Brand rules

Do not reuse the reference site's name, logo, copy, menu names, contact information, event artwork, or photographs. Create original assets with similar characteristics:

- candid interior/exterior bookstore-cafe photography;
- natural window light, warm wood, paper, plants, ceramic cups;
- subdued editing with soft highlights and moderate grain;
- original wordmark or typographic logo;
- original literary product names and editorial copy.

## 3. Color system

The exact source values are not treated as authoritative; use this implementation palette to recreate the observed warm, high-contrast atmosphere.

| Token | Value | Usage |
| --- | --- | --- |
| `--color-ink` | `#20211D` | Main text, dark surfaces |
| `--color-coffee` | `#4A3328` | Primary buttons, accents |
| `--color-forest` | `#34443A` | Secondary dark sections |
| `--color-cream` | `#F3EEDF` | Main page background |
| `--color-paper` | `#FBF8F0` | Cards and form fields |
| `--color-tan` | `#C6A984` | Rules, labels, small accents |
| `--color-rust` | `#9B5438` | Hover/accent color |
| `--color-white` | `#FFFDF8` | Text on photography/dark fills |
| `--color-border` | `rgba(32,33,29,.24)` | Lines and input borders |
| `--color-overlay` | `rgba(20,18,15,.42)` | Hero image overlay |

Maintain WCAG AA contrast for all functional text. Do not place small cream text directly over a busy photograph without an overlay.

## 4. Typography

Use an elegant display serif paired with a quiet, legible sans serif.

```css
--font-display: "Cormorant Garamond", "Times New Roman", serif;
--font-body: "Inter", "Helvetica Neue", Arial, sans-serif;
```

Recommended scale:

| Role | Desktop | Mobile | Notes |
| --- | ---: | ---: | --- |
| Hero title | `clamp(3.5rem, 7vw, 7rem)` | fluid | 0.92 line-height, slight negative tracking |
| Section title | `clamp(2.5rem, 4.5vw, 5rem)` | fluid | 0.95-1.05 line-height |
| Card title | `1.5-2rem` | `1.35-1.65rem` | Display serif |
| Eyebrow | `0.7rem` | `0.68rem` | Uppercase, `0.16em` tracking |
| Body large | `1.15rem` | `1.05rem` | 1.65 line-height |
| Body | `1rem` | `0.95rem` | 1.6 line-height |
| Navigation | `0.82rem` | `0.95rem` | Medium weight, subtle tracking |

Avoid excessive uppercase. Reserve it for navigation, small labels, dates, and buttons.

## 5. Grid and spacing

```css
--page-max: 1280px;
--content-max: 1120px;
--text-max: 680px;
--gutter: clamp(20px, 4vw, 64px);
--section-space: clamp(72px, 10vw, 144px);
--grid-gap: clamp(20px, 3vw, 40px);
--radius: 0px;
```

- The visual language should be rectangular and editorial. Avoid rounded app-like cards and pill buttons.
- Use full-bleed photography between contained text sections.
- Let large sections breathe; avoid stacking dense content with less than `64px` vertical separation.
- Use fine `1px` rules to divide metadata instead of shadows.
- Maximum body-copy line length: `65ch`.

## 6. Page anatomy

### 6.1 Header

Desktop header height: `84-96px`. Place the wordmark on the left, navigation in the middle/right, and a high-priority `Order Online` action on the far right.

```text
┌──────────────────────────────────────────────────────────┐
│ WORDMARK      Home  About  Books  Events  Journal  Order │
└──────────────────────────────────────────────────────────┘
```

- Background: cream or paper.
- Header may become sticky after the hero begins to leave the viewport.
- Use a solid bottom rule; no drop shadow.
- Active navigation is indicated with an underline or rust-colored text.
- `Order Online` is a solid rectangular button, minimum height `44px`.

Mobile:

- Header height `68-76px`.
- Keep wordmark left and a labeled menu icon right.
- Open a full-height cream navigation drawer with large serif links.
- Preserve the order button inside the drawer and keep tap targets at least `44×44px`.

### 6.2 Announcement bar

A single-line notice sits directly below the header.

- Background: forest or coffee.
- Text: paper/white, centered, `12-13px`.
- Height: `36-44px`; allow two lines on narrow screens.
- Content should be concise: changed hours, holiday closure, or an event notice.
- If dismissible, provide a visible close control and persist dismissal for the session.

### 6.3 Hero

Use a full-viewport-width store photograph with centered white content.

- Height: `clamp(620px, 82vh, 900px)` desktop, `72svh` mobile.
- Image: `object-fit: cover`; focal point configured per asset.
- Overlay: soft black/coffee gradient, stronger behind text.
- Content width: `min(760px, calc(100% - 40px))`.
- Order: logo/eyebrow → H1 → one-sentence descriptor → optional primary CTA.
- Keep animation subtle: a `400-600ms` fade/translate on first load only.

### 6.4 Welcome / introduction

Create an editorial split section: text and one large lifestyle image, with an optional smaller overlapping/detail image.

- Desktop: `5/7` or `6/6` columns.
- Text contains an eyebrow, large heading, 2-3 short paragraphs, and underlined `Learn More` link.
- Photography should feel candid and architectural, not like isolated e-commerce products.
- Use controlled asymmetry: image may extend to the viewport edge while text aligns to the content grid.
- Mobile: text first, then images; remove overlap to prevent cramped composition.

### 6.5 Location & hours

Use a broad image paired with a clear information panel.

- Desktop: image occupies roughly `60%`, information `40%`.
- Panel background: paper or forest; select text color accordingly.
- Separate address, contact, and schedule with thin rules.
- Make phone, email, and directions actionable links.
- Add a small `Get Directions` button; do not embed a heavy map on initial load.

### 6.6 Featured menu

This is a photography-first product gallery with literary/editorial naming.

- Section heading left; `Order Online` action right on desktop.
- Desktop grid: 3 cards per row; tablet 2; mobile 1 or a horizontal snap carousel.
- Use a consistent `4:5` or square image ratio.
- Card content: item name in display serif, one-line ingredient description, optional price.
- Cards have no floating shadow. Use image, whitespace, and a top border to create hierarchy.
- Hover: image scales to `1.03` inside an overflow-hidden frame; title changes to rust.

### 6.7 Upcoming events

Create an editorial event-card section, visually distinct from the menu.

- Background may switch to forest or dark coffee.
- Desktop: 2 featured cards or 3 standard cards.
- Artwork/image sits above or left of metadata.
- Required content: date, event name, location, short description, and action (`RSVP` or `Learn More`).
- Date should be easy to scan and not depend on the image artwork.
- If there are no events, show a calm empty state and newsletter CTA.

### 6.8 Book-order banner

Use a full-width image band with centered or edge-aligned overlay copy.

- Height: `420-560px` desktop, `380-460px` mobile.
- One clear message and one action only.
- Overlay and focus treatment follow the hero rules.
- This section acts as a visual pause between event content and form-heavy content.

### 6.9 Private-event inquiry

Use a two-column section with supporting photography on one side and a form on the other.

- Desktop fields use a 2-column grid for short pairs (`first/last name`, `date/time`).
- Long fields and textarea span both columns.
- Input height: `50-56px`; textarea minimum height: `140px`.
- Inputs use transparent/paper backgrounds, square corners, and `1px` borders.
- Labels always remain visible; placeholder text is supplemental only.
- Submit is a solid coffee button with clear loading, success, and error states.
- Keep success confirmation in the same region and move focus to it.

### 6.10 Local-author submission

Follow the same form language but vary the composition with a dark image-led background or a full-width split panel.

- Start with eligibility/help text before the form.
- Ask only for necessary information: name, email, title/ISBN, publisher, price, short bio/message.
- If uploads are supported, state file limits and accepted formats.
- Never reproduce the reference site's submission copy verbatim.

### 6.11 Newsletter and footer

The footer should feel like a final content section rather than a thin utility strip.

- Dark forest/ink background, paper text.
- Desktop grid: brand/about, newsletter form, visit/hours, navigation/social.
- Newsletter fields may sit inline on desktop and stack on mobile.
- Include privacy/consent text and clear validation.
- Bottom line: copyright, privacy, accessibility, and site credits.
- Do not include platform-builder branding in the recreation.

## 7. Components

### Buttons and links

- Primary: coffee fill, paper text, square edges, `12-18px` horizontal padding, minimum `44px` high.
- Secondary: transparent with `1px` ink border.
- Text link: animated underline, no decorative arrow unless it conveys direction.
- Hover transitions: `160-220ms ease-out`.
- Focus ring: `3px solid #C6A984` with `2px` offset.

### Cards

- No border radius or shadow.
- Use a consistent image crop.
- Entire card may be clickable only if it has one destination; otherwise keep actions explicit.
- Maintain visible focus treatment around the whole linked card.

### Forms

- Required fields marked in text, not color alone.
- Error messages appear below the field and are associated with `aria-describedby`.
- Retain entered values after validation failure.
- Avoid modal forms; keep forms within the natural page flow.

## 8. Responsive behavior

Use content-driven breakpoints rather than device names:

```css
/* mobile-first */
@media (min-width: 640px)  { /* two-column cards where useful */ }
@media (min-width: 900px)  { /* desktop navigation and split sections */ }
@media (min-width: 1200px) { /* wider spacing and 3-column menu */ }
```

- Below `900px`, all major split sections stack.
- On mobile, use `20px` page gutters and preserve large vertical spacing (`64-88px`).
- Do not reduce display headings below `2.35rem` merely to keep a single line; wrapping is intentional.
- Horizontal carousels must also expose previous/next controls and work with keyboard input.
- Prevent overlay text from colliding with important image subjects by storing per-image focal positions.
- Use `100svh`, not only `100vh`, for mobile hero sizing.

## 9. Motion

- Motion supports the editorial pace and should never become the subject.
- Use opacity and `8-16px` translate reveals for section entrances.
- Image hover zoom stays below `1.04`.
- Avoid parallax on mobile.
- Respect `prefers-reduced-motion: reduce` and disable nonessential transforms/scroll effects.

## 10. Photography direction

Create or license original assets in these groups:

1. Exterior/interior hero, landscape, minimum `2400px` wide.
2. Two welcome-section images: architectural wide shot and intimate detail.
3. Location/storefront image with clear negative space.
4. Six consistent drink/product photographs.
5. Two or three event artworks or candid gathering photos.
6. Book-order banner with shelves, hands, or stacked books.
7. Private-event and local-author supporting images.

Use `AVIF`/`WebP`, responsive `srcset`, explicit dimensions, and lazy loading below the fold. Keep the hero eager-loaded and consider `fetchpriority="high"` for its image.

## 11. Accessibility and performance

- Provide a skip link and semantic landmarks (`header`, `nav`, `main`, `section`, `footer`).
- One descriptive `h1`; section headings proceed logically.
- Alt text describes content/purpose rather than aesthetic mood.
- All functionality must work by keyboard.
- Visible focus states are mandatory on dark and light backgrounds.
- Target LCP under `2.5s`, CLS under `0.1`, and INP under `200ms` on a representative mobile connection.
- Defer event widgets, maps, and form providers until their section approaches the viewport.
- Avoid autoplay video and background audio.

## 12. Suggested content model

```ts
type HomePage = {
  announcement?: { text: string; href?: string };
  hero: { eyebrow?: string; title: string; body: string; image: Image };
  intro: { title: string; paragraphs: string[]; images: Image[] };
  location: { address: string; phone: string; email: string; hours: Hours[]; image: Image };
  menuItems: Array<{ name: string; description: string; price?: string; image: Image }>;
  events: Array<{ title: string; date: string; location: string; image: Image; href: string }>;
  bookOrder: { title: string; body?: string; image: Image; href: string };
};
```

## 13. Acceptance checklist

- [ ] Page follows the reference's long-form content rhythm without copying its brand assets.
- [ ] Hero is full-bleed, image-led, and readable at every breakpoint.
- [ ] Desktop navigation becomes an accessible mobile menu below `900px`.
- [ ] Welcome and location sections use editorial split layouts.
- [ ] Menu and event content is data-driven and responsive.
- [ ] Forms have persistent labels, inline validation, loading, success, and error states.
- [ ] Footer includes newsletter, hours/contact, navigation, and legal links.
- [ ] All interactive elements are keyboard accessible with visible focus.
- [ ] Images are responsive, optimized, and do not cause layout shift.
- [ ] The final implementation contains no copied logo, photography, copy, or proprietary reference-site assets.

## 14. Verification note

The public reference page was inspected on 2026-08-20 for its current information architecture and content sequence. The palette, measurements, type choices, interaction behavior, and breakpoint values above are implementation recommendations designed to achieve a comparable visual character; they are not claims of exact values extracted from the source.
