# JeeRaf Videos

JeeRaf Videos is a lightweight, static video gallery for product walkthroughs,
feature previews, and development updates for the JeeRaf CBT software. The
gallery keeps videos in one place and provides a numbered link for jumping to
and sharing each video.

## Features

- Embedded YouTube videos with direct YouTube links.
- Numbered video cards, displayed newest first.
- Shareable links to individual cards, such as `index.html#video2`.
- A date popup on each card, with a close button and a two-minute timeout.
- A separate documentation page for each video.
- Dark and light themes, with the selected theme saved in the browser and used
  across the gallery and documentation pages.
- Responsive layout for desktop and mobile screens.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Main gallery, numbered video cards, and jump links. |
| `style.css` | Shared layout, responsive styles, themes, controls, and documentation-page styles. |
| `script.js` | Shared theme toggle and video-date popup behavior. |
| `video1.html`, `video2.html` | Documentation pages for individual videos. |
| `DEVELOPMENT.md` | Step-by-step guide for adding videos, cards, documentation, and behavior. |

## Open the site

This project is static and has no build step or package dependencies. Open
`index.html` directly in a browser, or serve the repository directory with any
static web server. When hosted, share a video by appending its anchor to the
gallery URL, for example `https://example.com/#video2`.

See [DEVELOPMENT.md](./DEVELOPMENT.md) for the complete guide to maintaining and
extending the gallery.
