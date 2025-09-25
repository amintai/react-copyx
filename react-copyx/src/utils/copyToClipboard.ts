export interface CopyOptions {
  format?: 'text' | 'html'
  fallback?: boolean
}

/**
 * Copy string/HTML to clipboard with fallback.
 */
export async function copyToClipboard(
  value: string,
  opts: CopyOptions = {}
): Promise<void> {
  const { format = 'text', fallback = true } = opts

  // Prefer modern clipboard API
  if (navigator.clipboard) {
    try {
      if (format === 'html' && (navigator.clipboard as any).write) {
        const blob = new Blob([value], { type: 'text/html' })
        const item = new ClipboardItem({ 'text/html': blob })
        await (navigator.clipboard as any).write([item])
        return
      }
      await navigator.clipboard.writeText(value)
      return
    } catch (err) {
      if (!fallback) throw err
    }
  }

  // Fallback: execCommand
  if (fallback) {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)

    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)

    if (!success) throw new Error('Fallback copy failed')
    return
  }

  throw new Error('Copy not supported')
}
