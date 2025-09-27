"use client";

import { useRef, useState } from "react";
import { useCopy } from "react-copyx";
import reactLogo from "../../assets/react.svg";
import { Check, Clipboard } from "lucide-react"; // optional icons

const ButtonWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border rounded-2xl shadow-lg w-fit bg-white/50 backdrop-blur-sm mt-4">
    {children}
  </div>
);

const CopyButtonBase = ({
  onClick,
  isCopying,
  colorClass,
  label,
}: {
  onClick: () => void;
  isCopying: boolean;
  colorClass: string;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2 rounded-full text-white font-medium transition-all duration-300 ${colorClass} hover:scale-105 hover:shadow-lg`}
  >
    {isCopying ? <Check className="w-5 h-5 animate-bounce" /> : <Clipboard className="w-5 h-5" />}
    {isCopying ? "Copied!" : label}
  </button>
);

export const CopyTextButton = () => {
  const { isCopying, copy } = useCopy();

  return (
    <ButtonWrapper>
      <CopyButtonBase
        onClick={() => copy("Hello from CopyX!")}
        isCopying={isCopying}
        colorClass="bg-blue-500 hover:bg-blue-600"
        label="Copy Text"
      />
    </ButtonWrapper>
  );
};

export const CopyHtmlButton = () => {
  const { isCopying, copy } = useCopy();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (contentRef.current) {
      copy(contentRef.current.innerHTML, { format: "html" });
    }
  };

  return (
    <ButtonWrapper>
      <div
        ref={contentRef}
        className="mb-2 p-2 bg-gray-100 rounded text-sm"
        contentEditable
        suppressContentEditableWarning
      >
        <b style={{ color: "red" }}>Hello from CopyX!</b>
        <p>This is a paragraph with <i>formatted text</i>.</p>
      </div>
      <CopyButtonBase
        onClick={handleCopy}
        isCopying={isCopying}
        colorClass="bg-green-500 hover:bg-green-600"
        label="Copy HTML"
      />
    </ButtonWrapper>
  );
};

export const CopyJsonButton = () => {
  const { isCopying, copy } = useCopy();
  const jsonData = { user: "Amin", project: "react-copyx", downloads: 67 };

  return (
    <ButtonWrapper>
      <CopyButtonBase
        onClick={() => copy(jsonData, { format: "json" })}
        isCopying={isCopying}
        colorClass="bg-purple-500 hover:bg-purple-600"
        label="Copy JSON"
      />
    </ButtonWrapper>
  );
};

export const CopyImageButton = () => {
  const { isCopying, copy } = useCopy();

  const handleCopyImage = async () => {
    try {
      const response = await fetch(reactLogo);
      const blob = await response.blob();

      try {
        await copy(blob, { format: "image" });
        alert("Image copied as raw Blob! Paste into supported apps.");
      } catch {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          await copy(base64data, { format: "text" });
          alert("Image copied as Base64! Paste into web apps.");
        };
        reader.readAsDataURL(blob);
      }
    } catch (err) {
      console.error("Copy image failed:", err);
    }
  };

  return (
    <ButtonWrapper>
      <CopyButtonBase
        onClick={handleCopyImage}
        isCopying={isCopying}
        colorClass="bg-pink-500 hover:bg-pink-600"
        label="Copy Image"
      />
    </ButtonWrapper>
  );
};
