export interface CopyOptions {
  format?: "text" | "html" | "json" | "image"
  fallback?: boolean
  mimeType?: string // allow custom MIME
}

/**
 * Copy text/HTML/JSON/images to clipboard with fallback.
 */
export async function copyToClipboard(
  value: string | HTMLElement | Blob | Record<string, unknown>,
  opts: CopyOptions = {}
): Promise<void> {
  const { format = "text", fallback = true, mimeType } = opts


  function stripHtmlTags(html: string) {
    const div = document.createElement("div")
    div.innerHTML = html
    return div.textContent || div.innerText || ""
  }

  // Prefer modern Clipboard API
  if (navigator.clipboard) {
    try {
      if (format === "html") {
        const htmlString = typeof value === "string" ? value : "";


        const plainText = htmlString.replace(/<[^>]+>/g, "");

        const htmlBlob = new Blob([htmlString], { type: "text/html" })
        const textBlob = new Blob([plainText], { type: "text/plain" })

        const item = new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
        });

        await navigator.clipboard.write([item])

        if (fallback) {
          const textarea = document.createElement("textarea");
          const content = typeof value === "string" ? value : JSON.stringify(value);
          textarea.value = stripHtmlTags(content);
          textarea.setAttribute("readonly", "");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);

          textarea.select();
          const success = document.execCommand("copy");
          document.body.removeChild(textarea);

          if (!success) throw new Error("Fallback copy failed");
          return;
        }
      }

      if (format === "json") {
        // Always stringify JSON
        const jsonStr = typeof value === "string" ? value : JSON.stringify(value, null, 2);

        // ClipboardItem with both application/json and text/plain
        const item = new ClipboardItem({
          "application/json": new Blob([jsonStr], { type: "application/json" }),
          "text/plain": new Blob([jsonStr], { type: "text/plain" })
        });

        try {
          await navigator.clipboard.write([item]);
        } catch (err) {
          if (!fallback) throw err;

          // Fallback for apps not supporting Clipboard API
          const textarea = document.createElement("textarea");
          textarea.value = jsonStr;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);

          textarea.select();
          const success = document.execCommand("copy");
          document.body.removeChild(textarea);

          if (!success) throw new Error("Fallback copy failed");
        }

        return;
      }



      if (format === "image") {
        // Raw Blob copy for supported environments
        if ((navigator.clipboard as any).write && value instanceof Blob) {
          const type = mimeType || value.type || "image/png";
          const item = new ClipboardItem({ [type]: value });
          try {
            await (navigator.clipboard as any).write([item]);
            return; // Success
          } catch (err) {
            console.warn("Raw image copy failed, will fallback to Base64/text.", err);
          }
        }

        // Fallback: convert Blob to Base64 and copy as text
        let base64data: string;
        if (value instanceof Blob) {
          const reader = new FileReader();
          base64data = await new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(value);
          });
        } else if (typeof value === "string") {
          base64data = value; // already a URL or Base64
        } else {
          throw new Error("Invalid value for image copy");
        }

        // Copy Base64 / URL as text
        await navigator.clipboard.writeText(base64data);
        return;
      }

      // Default to plain text
      if (typeof value === "string") {
        await navigator.clipboard.writeText(value)
        return
      }

      throw new Error("Unsupported format for Clipboard API")
    } catch (err) {
      if (!fallback) throw err
    }
  }

  throw new Error("Copy not supported in this environment")
}
