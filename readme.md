# React CopyX 🪄

A **lightweight, flexible React utility** for copying text, JSON, HTML, and more to the clipboard with built-in success state handling. Includes a **demo project** to quickly try and test the package.

---

## 🚀 Features

### Package: `react-copyx`
- 📋 Copy **text, JSON, or HTML** with one line of code
- 🔄 Automatic success states: `isCopying`, `lastCopied`, `history`
- 🪝 Custom hook + optional utility functions for full control
- 🪶 Super lightweight (~3.7KB gzipped), tree-shakable
- ✅ React as a **peer dependency** (no React bundle included)

### Demo Project
- Quick playground to try the hook and utilities
- Example usage of copy buttons, text areas, JSON objects
- Visual feedback for successful copy actions

---

## 📦 Installation

Install the package via npm or pnpm:

```bash
npm install react-copyx
# or
pnpm add react-copyx
```

---

## 🪝 Usage

### Basic Hook Example
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

### Utility Function Example
```ts
import { copyToClipboard } from 'react-copyx';

copyToClipboard({ text: 'Some text', format: 'text/plain' });
```

---

## 🖥️ Running the Demo

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

## 💡 Why React CopyX?

I built this package to **eliminate repetitive copy-to-clipboard logic** across React projects. It’s lightweight, reliable, and reusable, making it ideal for developers and teams who want a **clean, performant solution** for clipboard interactions.

---

## 📝 Contribution

- Contributions are welcome! Feel free to open issues, submit PRs, or suggest improvements.
- Future features could include enhanced copy history, React Native support, and advanced clipboard formats.

---

## 📄 License

[ISC License](LICENSE)

---

## 🔗 Links

- NPM: [https://www.npmjs.com/package/react-copyx](https://www.npmjs.com/package/react-copyx)  
- GitHub: [https://github.com/amintai/react-copyx](https://github.com/amintai/react-copyx)  

---

## ⚡ Screenshots

*(Include screenshot(s) of the demo app here to show UI and functionality)*

