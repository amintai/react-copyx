# React CopyX

A **powerful, flexible React hook and components for copying text, HTML, JSON, and images to clipboard** with fallback support.
Make copying easy in your React apps, with **success states, copy history, and optional callbacks**.

---

## Features

* Copy **plain text**, **HTML**, **JSON**, and **images**.
* Auto success state management (`isCopying`, `lastCopied`, `copyCount`, `history`).
* Modern Clipboard API with **fallback support**.
* **Optional callbacks** on success or error.
* Easy to integrate **React components** for quick demos.
* Works in **React 18+** apps.
* Minimal and dependency-free.

---

## Installation

Install via npm or pnpm:

```bash
# Using npm
npm install react-copyx

# Using pnpm
pnpm add react-copyx
```

> ⚠️ Demo-specific styling or libraries (Tailwind, icons) should only be installed in your demo/docs apps, not in your package.

---

## Usage

### Using the Hook

```tsx
import { useCopy } from 'react-copyx';

export const MyComponent = () => {
  const { copy, isCopying, lastCopied, copyCount } = useCopy({
    onSuccess: (value) => console.log('Copied:', value),
    onError: (err) => console.error('Copy failed', err),
    keepHistory: true,
    resetAfter: 2000,
  });

  return (
    <button onClick={() => copy("Hello World!")}> 
      {isCopying ? "✅ Copied!" : "📋 Copy Text"}
    </button>
  );
};
```

---

### Hook API

| Prop / Return          | Type                                           | Description                                                   |                                                                  |                                                                                                  |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `copy(value, options)` | `(value: string                                | Blob                                                          | Record<string,unknown>, options?: CopyOptions) => Promise<void>` | Copy a value to clipboard. `options` allows specifying format (`text`, `html`, `json`, `image`). |
| `isCopying`            | `boolean`                                      | True while copy action is in progress.                        |                                                                  |                                                                                                  |
| `lastCopied`           | `{ value: string, timestamp: number } \| null` | Last copied value and time.                                   |                                                                  |                                                                                                  |
| `copyCount`            | `number`                                       | Total number of copy actions triggered.                       |                                                                  |                                                                                                  |
| `history`              | `Array<{ value: string, timestamp: number }>`  | Optional history of copied values (if `keepHistory` is true). |                                                                  |                                                                                                  |
| `hasCopiedRecently`    | `boolean`                                      | True if last copy was within `resetAfter` ms.                 |                                                                  |                                                                                                  |

### CopyOptions

| Option     | Type      | Default | Description                                 |          |          |                               |
| ---------- | --------- | ------- | ------------------------------------------- | -------- | -------- | ----------------------------- |
| `format`   | `'text'   | 'html'  | 'json'                                      | 'image'` | `'text'` | Format of the copied content. |
| `fallback` | `boolean` | `true`  | Whether to use fallback for older browsers. |          |          |                               |
| `mimeType` | `string`  | —       | Custom MIME type for images.                |          |          |                               |

---

## Best Practices

* Use `keepHistory: true` if you need multiple copy tracking.
* Always provide `onError` callback for robust apps.
* HTML copy is supported in modern browsers; fallback may strip formatting.
* Images require modern Clipboard API support (`navigator.clipboard.write`).

---

This keeps the package **lightweight and dependency-free**.

---

## License

MIT © Amin Tai
