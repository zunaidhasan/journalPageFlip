# StPageFlip

Realistic page-turn effects for the browser. Use HTML pages or canvas images, with a small API and no runtime dependencies.

![StPageFlip demo](video.gif)

- [Demo](https://nodlik.github.io/StPageFlip/)
- [API docs](https://nodlik.github.io/StPageFlip/docs/index.html)
- [React wrapper](https://nodlik.github.io/react-pageflip/)
- [npm: `page-flip`](https://www.npmjs.com/package/page-flip)

[![GitHub license](https://img.shields.io/github/license/Nodlik/StPageFlip)](https://github.com/Nodlik/StPageFlip/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/page-flip)](https://www.npmjs.com/package/page-flip)
[![npm](https://img.shields.io/npm/dm/page-flip)](https://npmcharts.com/compare/page-flip?minimal=true)

## Features

- HTML pages or image-based canvas books
- Landscape and portrait layouts
- Soft and hard pages (HTML mode)
- Pointer, swipe, click, and keyboard controls
- LTR and RTL reading direction
- Reduced-motion support
- ESM, CJS, and UMD builds with TypeScript types
- Zero runtime dependencies

## Install

```bash
npm install page-flip
```

Or load the browser bundle:

```html
<script src="{path/to/scripts}/page-flip.browser.js"></script>
```

## Quick start

### Module

```js
import { PageFlip } from 'page-flip';

const pageFlip = new PageFlip(document.getElementById('book'), {
    width: 400,
    height: 600,
});

pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
```

### Browser global

```js
const pageFlip = new St.PageFlip(document.getElementById('book'), {
    width: 400,
    height: 600,
});
```

`htmlParentElement` is the root element that hosts the book. `settings` is the configuration object.

## HTML pages

```html
<div id="book">
    <div class="my-page" data-density="hard">Page Cover</div>
    <div class="my-page">Page one</div>
    <div class="my-page">Page two</div>
    <div class="my-page">Page three</div>
    <div class="my-page">Page four</div>
    <div class="my-page" data-density="hard">Last page</div>
</div>
```

```js
const pageFlip = new PageFlip(document.getElementById('book'), {
    width: 400,
    height: 600,
});

pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
```

Set `data-density="hard"` or `data-density="soft"` on a page to control the fold animation. Hard pages are typical for covers.

## Image pages

```js
pageFlip.loadFromImages(['path/to/image1.jpg', 'path/to/image2.jpg']);
```

## Configuration

Pass these options when creating `PageFlip`. `width` and `height` are required.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number` | — | Page width |
| `height` | `number` | — | Page height |
| `size` | `"fixed"` \| `"stretch"` | `"fixed"` | Fixed size, or stretch to the parent |
| `minWidth`, `maxWidth`, `minHeight`, `maxHeight` | `number` | `0` | Size limits when `size` is `"stretch"` |
| `drawShadow` | `boolean` | `true` | Draw fold shadows |
| `flippingTime` | `number` | `1000` | Animation duration in milliseconds |
| `usePortrait` | `boolean` | `true` | Allow portrait (single-page) mode. HTML mode clones pages |
| `startZIndex` | `number` | `0` | Base z-index |
| `startPage` | `number` | `0` | First page shown (0-based) |
| `autoSize` | `boolean` | `true` | Size the parent to the book |
| `maxShadowOpacity` | `number` (`0..1`) | `1` | Shadow intensity |
| `showCover` | `boolean` | `false` | Treat first and last pages as hard covers |
| `mobileScrollSupport` | `boolean` | `true` | Block page scroll while touching the book |
| `swipeDistance` | `number` | `30` | Minimum swipe distance in pixels |
| `clickEventForward` | `boolean` | `true` | Forward clicks to interactive children (`a`, `button`, form controls, `[role="button"]`, `[data-no-flip]`) |
| `useMouseEvents` | `boolean` | `true` | Enable pointer / mouse / touch flipping |
| `showPageCorners` | `boolean` | `true` | Fold corners on hover |
| `disableFlipByClick` | `boolean` | `false` | Only allow click-to-flip on corners |
| `direction` | `"ltr"` \| `"rtl"` | `"ltr"` | Reading direction (hit zones, swipes, and arrows reverse in RTL) |
| `useKeyboardEvents` | `boolean` | `true` | Arrow / Home / End keys when the book is focused |
| `respectReducedMotion` | `boolean` | `true` | Skip fold animation when `prefers-reduced-motion: reduce` |
| `ariaLabel` | `string` | `"Flipbook"` | Accessible name; current page is appended automatically |

## Events

```js
pageFlip.on('flip', (e) => {
    console.log(e.data);
});
```

Listen for `init` **before** calling `loadFromHTML` or `loadFromImages`.

| Event | `data` | When |
| --- | --- | --- |
| `flip` | `number` | A page turn finishes |
| `changeOrientation` | `"portrait"` \| `"landscape"` | Orientation changes |
| `changeState` | `"user_fold"` \| `"fold_corner"` \| `"flipping"` \| `"read"` | Book state changes |
| `init` | `{ page, mode }` | Book is ready and the start page is shown |
| `update` | `{ page, mode }` | Pages were replaced with `updateFromHtml` / `updateFromImages` |

Each event payload has `data` and `object` (the `PageFlip` instance).

## Methods

| Method | Returns | Description |
| --- | --- | --- |
| `getPageCount()` | `number` | Total page count |
| `getOrientation()` | `"portrait"` \| `"landscape"` | Current orientation |
| `getBoundsRect()` | `PageRect` | Book size and position |
| `getCurrentPageIndex()` | `number` | Current page index (0-based) |
| `turnToPage(pageNum)` | — | Jump to a page, no animation |
| `turnToNextPage()` | — | Next page, no animation |
| `turnToPrevPage()` | — | Previous page, no animation |
| `flipNext(corner?)` | — | Animate to the next page (`"top"` \| `"bottom"`) |
| `flipPrev(corner?)` | — | Animate to the previous page |
| `flip(pageNum, corner?)` | — | Animate to a page |
| `loadFromImages(images)` | — | Load canvas pages from image URLs |
| `loadFromHTML(items)` | — | Load pages from HTML elements |
| `updateFromImages(images)` | — | Replace canvas pages |
| `updateFromHtml(items)` | — | Replace HTML pages |
| `update()` | — | Recalculate layout and redraw |
| `destroy()` | — | Remove wrappers and listeners. The host element stays in the document |

## Keyboard

Focus the book, then:

- `ArrowRight` / `ArrowLeft` — next / previous (swapped in RTL)
- `Home` / `End` — first / last page

## Development

```bash
# Install (peer deps need this flag)
npm install --legacy-peer-deps

# Tests
npm test

# Library build (ESM, CJS, UMD + types)
npm run build

# Demo site output in public/
npm run build:web
```

The playground lives in `demo/index.html`. `build:web` copies it to `public/` with the browser bundle for static hosting.

## License

[MIT](LICENSE)
