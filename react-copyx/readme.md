# React CopyX – React Clipboard Hook & Components

A **powerful, flexible React hook and components for copying text, HTML, JSON, and images to the clipboard** with built-in success states, copy history, and fallback support.  
Make copying effortless in your **React 18+ apps** with a **lightweight, dependency-free clipboard solution**.

---

## Features

- 📋 Copy **plain text**, **HTML**, **JSON**, and **images**.  
- 🔄 Auto success state management: `isCopying`, `lastCopied`, `copyCount`, `history`.  
- 🌍 Modern **Clipboard API** with **fallback support** for older browsers.  
- 🎯 **Optional callbacks** on success or error.  
- ⚡ Ready-to-use **React components** for quick demos.  
- 🪶 Lightweight, **dependency-free** (< 4KB gzipped).  

---

## Installation

Install via npm or pnpm:

```bash
# Using npm
npm install react-copyx

# Using pnpm
pnpm add react-copyx
```

> Demo-only dependencies (Tailwind, icons) are **not included** in the package.

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

## API Reference

### Hook API

| Prop / Return          | Type                                           | Description                                                                                     |
| ---------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `copy(value, options)` | `(value: string \| Blob \| Record<string,unknown>, options?: CopyOptions) => Promise<void>` | Copy a value to clipboard. Supports `text`, `html`, `json`, and `image`. |
| `isCopying`            | `boolean`                                      | True while copy action is in progress.                                                          |
| `lastCopied`           | `{ value: string, timestamp: number } \| null` | Last copied value and timestamp.                                                                |
| `copyCount`            | `number`                                       | Total number of copy actions.                                                                   |
| `history`              | `Array<{ value: string, timestamp: number }>`  | History of copied values (if `keepHistory` is enabled).                                         |
| `hasCopiedRecently`    | `boolean`                                      | True if last copy was within `resetAfter` ms.                                                   |

---

### CopyOptions

| Option     | Type      | Default | Description                                 |
| ---------- | --------- | ------- | ------------------------------------------- |
| `format`   | `'text' \| 'html' \| 'json' \| 'image'` | `'text'` | Format of the copied content. |
| `fallback` | `boolean` | `true`  | Enable fallback for unsupported browsers.   |
| `mimeType` | `string`  | —       | Custom MIME type (for images).              |

---

## Best Practices

- Use `keepHistory: true` if you need multiple copy tracking.  
- Always provide an `onError` callback for robust apps.  
- HTML copy requires modern browsers; fallback may strip formatting.  
- Images require `navigator.clipboard.write` support.  

---

## FAQ (SEO Optimized)

### 🔹 How do I copy text to clipboard in React?
Use the `useCopy` hook:
```tsx
const { copy } = useCopy();
copy("Hello World");
```

### 🔹 Can I copy JSON or HTML to clipboard in React?
Yes!  
```ts
copyToClipboard({ text: JSON.stringify({ name: "Amin" }), format: "application/json" });
```

### 🔹 Does React CopyX support images?
Yes, with the modern Clipboard API (`navigator.clipboard.write`).  

---

## 📄 License

MIT © [Amin Tai](https://github.com/amintai)