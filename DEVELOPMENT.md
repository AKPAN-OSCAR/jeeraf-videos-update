# Developer guide

This project is a static HTML/CSS/JavaScript site. There is no build step,
package manager, or framework. Keep the numbered links, card IDs, document
filenames, and card content in sync whenever you add a video.

## Files and responsibilities

- `index.html` contains the gallery navigation, video cards, and each card's
  metadata and links.
- `style.css` contains the shared gallery and documentation-page styles, the
  dark/light theme palettes, and responsive rules.
- `script.js` sets and saves the selected theme and handles the date popups.
- `script.js` also controls the shared floating **Back to top** button.
- `videoN.html` is the documentation page for Video N. The existing pages are
  `video1.html` and `video2.html`.

All pages load the same `style.css` and `script.js`. Keep both references on
new HTML pages so their theme controls work consistently.

## Adding a video

Use the next unused number. If the current highest number is `video2`, the next
video is `video3`; do not renumber earlier videos when adding newer ones.

### 1. Add the jump link

In `index.html`, add a link in the `.video-index` navigation:

```html
<a href="#video3">Video 3</a>
```

Keep jump links in numeric order for easy browsing. Their targets must match
the corresponding card IDs exactly.

### 2. Add the card

Add a new `<article>` to `<main>` with the newest video first, above the older
cards. Replace the example title, YouTube ID, description, date, and document
number with the values for the new video.

```html
<article class="video-card" id="video3">
  <div class="player">
    <iframe
      src="https://www.youtube-nocookie.com/embed/YOUTUBE_VIDEO_ID"
      title="Accessible title describing Video 3"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
  <div class="video-info">
    <div>
      <h3>Video title</h3>
      <p>A short description of the video.</p>
    </div>
    <div class="video-actions">
      <a class="video-number" href="#video3">Video 3</a>
      <button
        class="date-button"
        type="button"
        aria-controls="video3-date"
        aria-expanded="false"
        data-date-toggle
      >
        Show date
      </button>
      <a class="action-link" href="video3.html">View doc</a>
      <a
        class="action-link"
        href="https://youtu.be/YOUTUBE_VIDEO_ID"
        target="_blank"
        rel="noopener noreferrer"
      >
        YouTube
      </a>
      <div
        class="date-popup"
        id="video3-date"
        role="dialog"
        aria-modal="false"
        aria-labelledby="video3-date-heading"
        hidden
      >
        <button
          class="date-close"
          type="button"
          aria-label="Close date"
          data-date-close
        >×</button>
        <p class="date-popup-heading" id="video3-date-heading">Video date</p>
        <time datetime="2026-10-20">20 October, 2026</time>
        <p class="date-popup-note">
          This date card closes automatically after 2 minutes.
        </p>
      </div>
    </div>
  </div>
</article>
```

The YouTube embed URL uses the video ID in
`https://www.youtube-nocookie.com/embed/VIDEO_ID`. The compact **YouTube** link
uses the regular URL `https://youtu.be/VIDEO_ID`. Use the same YouTube ID in
both places.

### 3. Add the documentation page

Create `video3.html` in the repository root. Start with this page structure and
put the video-specific notes inside `<main class="doc-content">`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Documentation for JeeRaf CBT Video 3." />
    <meta name="theme-color" content="#090d18" />
    <title>Video 3 Documentation — JeeRaf Videos</title>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js" defer></script>
  </head>
  <body class="doc-page">
    <div class="shell">
      <nav class="topbar" aria-label="Main navigation">
        <a class="brand" href="index.html">JEERAF CBT</a>
        <a class="project-link" href="index.html#video3">Back to Video 3</a>
        <button
          class="theme-toggle"
          type="button"
          data-theme-toggle
          aria-label="Toggle color theme"
        >
          Light mode
        </button>
      </nav>

      <header>
        <p class="eyebrow">JeeRaf CBT · Video 3</p>
        <h1>Video 3 documentation</h1>
        <p class="intro">Documentation and notes for Video 3.</p>
      </header>

      <main class="doc-content" aria-label="Video 3 documentation">
        <h2>Documentation</h2>
        <!-- Add Video 3 documentation below this heading. -->
      </main>
    </div>
    <button class="back-to-top" type="button" data-back-to-top hidden>
      Back to top
    </button>
  </body>
</html>
```

The `.doc-page` background is black in dark mode. In light mode, it follows the
light theme. The shared theme button and JavaScript make the user's choice
consistent with the gallery and other documentation pages.

### 4. Update the video count

Change the `.video-count` text in `index.html` so it reflects the total number
of cards. For example, after adding Video 3, change `2 videos` to `3 videos`.

## Adding or adjusting card controls

Each card's `.video-actions` contains its number link, date button, documentation
link, and YouTube link. Keep these controls grouped inside the matching card
so they stay together on mobile.

- **Video number:** Set both the card ID and the number link to the same anchor,
  such as `id="video3"` and `href="#video3"`. This gives viewers a shareable
  gallery URL ending in `#video3`.
- **Date:** Give each date popup a unique ID, such as `video3-date`. Point the
  button's `aria-controls` to that ID. Set the popup's `aria-labelledby` to
  the ID of its heading and use a valid ISO date in the `<time datetime>`
  attribute.
- **Documentation:** Link to the matching page, for example
  `href="video3.html"`, and create that page in the repository root.
- **YouTube:** Use the same YouTube video ID in the embed and external link.
  Keep `target="_blank"` paired with `rel="noopener noreferrer"`.

Style shared controls in `style.css`; do not add page-specific inline style
blocks. Use the existing variables and selectors so controls respond correctly
to both themes.

## JavaScript behavior

`script.js` is loaded with `defer`, so the HTML is parsed before the script
looks up its controls.

### Theme toggle

Every page must include exactly one button with `data-theme-toggle`. The script
sets `data-theme="dark"` or `data-theme="light"` on the root `<html>` element.
`style.css` uses that attribute to select theme variables. The chosen theme is
saved in `localStorage` under `jeeraf-theme`, so it persists across pages in
the same browser. Dark mode is the default when no light-theme choice has been
saved.

### Date popup

The script finds every button with `data-date-toggle`, reads its
`aria-controls`, and attaches handlers to its corresponding popup and
`data-date-close` button. No additional JavaScript is needed for a new card if
its markup follows the pattern above.

Only one date popup is open at a time. It closes from its close button, the
Escape key, opening another date popup, or after two minutes. The timeout is
controlled by `dateCardTimeout` at the top of `script.js` (milliseconds).
Opening or closing a popup also updates the button's `aria-expanded` value.

If adding a new interactive behavior, keep its setup in `script.js`, add
accessible controls and state attributes in the HTML, and put presentation in
`style.css`. Do not put script code inline in a page.

### Back-to-top button

Every page using `script.js` must include one button with
`data-back-to-top`. It is hidden until the visitor scrolls at least 400 pixels,
then appears fixed at the bottom-right. Clicking it scrolls to the top smoothly
unless the visitor has enabled reduced motion in their operating-system
settings. Use the shared `.back-to-top` styles rather than adding a page-specific
version.

## Checklist before publishing

1. The new card has a unique `id="videoN"` and is placed above older cards.
2. The jump-list link and card number link both point to `#videoN`.
3. The embedded player and YouTube link use the same correct video ID.
4. The date button's `aria-controls` matches a unique popup ID; the popup's
   heading reference and date are correct.
5. The **View doc** link opens the matching `videoN.html` page.
6. The documentation page links to `style.css` and `script.js`, has a theme
   toggle, and links back to `index.html#videoN`.
7. The video count reflects the number of cards.
8. Test the page in both themes and check the card controls at desktop and
   mobile widths.
