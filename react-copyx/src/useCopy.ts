import { useState, useCallback } from 'react'
import { copyToClipboard, CopyOptions } from './utils/copyToClipboard'

interface LastCopied {
  value: string
  timestamp: number
}

export function useCopy() {
  const [isCopying, setIsCopying] = useState(false)
  const [lastCopied, setLastCopied] = useState<LastCopied | null>(null)

  const copy = useCallback(async (value: string, opts?: CopyOptions) => {
    setIsCopying(true)
    try {
      await copyToClipboard(value, opts)
      setLastCopied({ value, timestamp: Date.now() })
    } finally {
      setIsCopying(false)
    }
  }, [])

  return { copy, isCopying, lastCopied }
}
    