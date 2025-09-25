"use client";

import { useCopy } from "../useCopy";

export const CopyButton = () => {
    const { isCopying, copy } = useCopy();

    return (
        <div className="p-4 border rounded-md w-fit">
            <button
                onClick={() => copy("Hello from CopyX!")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {isCopying ? "✅ Copied!" : "📋 Copy Text"}
            </button>
        </div>
    );
}
