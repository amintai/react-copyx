import { useState, useCallback, useRef, useEffect } from "react"
import { copyToClipboard, CopyOptions } from "./utils/copyToClipboard"

interface LastCopied {
  value: string
  timestamp: number
}

interface UseCopyOptions {
  onSuccess?: (value: string) => void
  onError?: (err: unknown) => void
  resetAfter?: number 
  keepHistory?: boolean
}

export function useCopy(opts?: UseCopyOptions) {
  const { onSuccess, onError, resetAfter = 2000, keepHistory = false } = opts || {}

  const [isCopying, setIsCopying] = useState(false)
  const [lastCopied, setLastCopied] = useState<LastCopied | null>(null)
  const [history, setHistory] = useState<LastCopied[]>([])
  const [copyCount, setCopyCount] = useState(0)

  const timeoutRef = useRef<number | undefined>(undefined);

  const copy = useCallback(
    async (value: string, copyOpts?: CopyOptions) => {
      setIsCopying(true)
      try {
        await copyToClipboard(value, copyOpts)
        const entry = { value, timestamp: Date.now() }
        setLastCopied(entry)
        setCopyCount((prev) => prev + 1)
        if (keepHistory) setHistory((prev) => [entry, ...prev])

        onSuccess?.(value)

        if (resetAfter > 0) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = window.setTimeout(() => {
            setIsCopying(false)
          }, resetAfter)
        } else {
          setIsCopying(false)
        }
      } catch (err) {
        onError?.(err)
        setIsCopying(false)
      }
    },
    [keepHistory, onSuccess, onError, resetAfter]
  )

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return {
    copy,
    isCopying,
    lastCopied,
    hasCopiedRecently: !!lastCopied && Date.now() - lastCopied.timestamp < resetAfter,
    history,
    copyCount,
  }
}
