# React CopyX – Copy to Clipboard Made Easy in React

A **lightweight, flexible React hook and utility library for copying text, JSON, HTML, and images to the clipboard** with built-in success state handling.  
Perfect for building **React apps, forms, editors, and dashboards** where users need quick **copy-to-clipboard functionality**. Includes a live **demo project** to try it instantly.

---

## Features

### Package: `react-copyx`
- 📋 Copy **plain text**, **JSON objects**, **HTML**, and **custom clipboard formats** with a single line.
- 🔄 Automatic state management: `isCopying`, `lastCopied`, `history`.
- 🪝 **React hook** + **utility functions** for flexible use cases.
- 🪶 Super lightweight (~3.7KB gzipped), tree-shakable, zero bloat.
- ✅ Works with **React 16+** as a peer dependency (no React bundled in).

### Demo Project
- Playground to test the hook & utilities.
- Example copy buttons, text areas, JSON objects.
- Real-time **visual feedback** for successful copy actions.

---

## Installation

Install the package using npm or pnpm:

```bash
npm install react-copyx
# or
pnpm add react-copyx
```

---

## Usage Examples

### 🔹 Basic Hook Example
```tsx
import { useCopy } from 'react-copyx';

function App() {
  const { copy, isCopying, lastCopied } = useCopy();

  return (
    <div>
      <button onClick={() => copy('Hello World!')}>
        {isCopying ? 'Copying...' : 'Copy Text'}
      </button>
      {lastCopied && <p>Last copied: {lastCopied}</p>}
    </div>
  );
}
```

### 🔹 Utility Function Example
```ts
import { copyToClipboard } from 'react-copyx';

copyToClipboard({ text: 'Some text', format: 'text/plain' });
```

---

## Running the Demo Locally

1. Navigate to the demo project:
   ```bash
   cd demo-project
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the demo:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the demo in action.

---

## Why Use React CopyX?

I built this package to **eliminate repetitive copy-to-clipboard logic** across React projects.  
With React CopyX you get:
- ✅ A **clean, reusable hook** instead of boilerplate code.  
- ✅ **Cross-browser compatibility** with built-in fallbacks.  
- ✅ **Lightweight performance** for production-ready apps.  
- ✅ **Flexible utilities** for both simple and advanced use cases.  

Whether you’re building **forms, dashboards, editors, or SaaS apps**, React CopyX gives you a **reliable clipboard solution**.

---

## FAQ (SEO Optimized)

### 🔹 How do I copy text to clipboard in React?
Use the `useCopy` hook from React CopyX:
```tsx
const { copy } = useCopy();
copy("Hello World");
```

### 🔹 How to copy JSON or HTML to clipboard in React?
```ts
copyToClipboard({ text: JSON.stringify({ name: "John" }), format: "application/json" });
```

### 🔹 Is React CopyX better than `navigator.clipboard.writeText`?
Yes. While the native API works, React CopyX adds:
- Built-in **success/error states**  
- **History tracking**  
- Works with **JSON, HTML, and custom formats**  

### 🔹 Does it work with React Native?
Currently focused on web, but **React Native support** is on the roadmap.

---

## Contribution

- Contributions are welcome!  
- Open issues, submit PRs, or suggest features.  
- Upcoming ideas: advanced clipboard formats, React Native support, richer copy history.

---

## License

[ISC License](LICENSE)

---

## 🔗 Links

- 📦 NPM: [https://www.npmjs.com/package/react-copyx](https://www.npmjs.com/package/react-copyx)  
- 💻 GitHub: [https://github.com/amintai/react-copyx](https://github.com/amintai/react-copyx)  


---

## ⭐ Support & Feedback
If you like this project, please consider **starring it on GitHub** and sharing it.  
It helps more developers discover **React CopyX** 🔥
