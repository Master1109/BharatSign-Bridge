import { useCallback, useRef, useState } from 'react'

const CLIP_DURATION_MS = 2800

/**
 * Wraps MediaRecorder to capture short (2-3s) video clips from a live
 * MediaStream for sign recognition, with manual start/stop control.
 */
export function useSignRecorder(stream: MediaStream | null) {
  const [isRecording, setIsRecording] = useState(false)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const autoStopRef = useRef<number | null>(null)

  const stopNow = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = recorderRef.current
      if (!recorder || recorder.state === 'inactive') {
        resolve(null)
        return
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        chunksRef.current = []
        setIsRecording(false)
        resolve(blob)
      }
      recorder.stop()
    })
  }, [])

  const start = useCallback(
    (onAutoStop: (blob: Blob | null) => void) => {
      if (!stream || !window.MediaRecorder) return
      chunksRef.current = []
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm',
      })
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorderRef.current = recorder
      recorder.start()
      setIsRecording(true)

      autoStopRef.current = window.setTimeout(() => {
        stopNow().then(onAutoStop)
      }, CLIP_DURATION_MS)
    },
    [stream, stopNow]
  )

  const cancel = useCallback(() => {
    if (autoStopRef.current) window.clearTimeout(autoStopRef.current)
    const recorder = recorderRef.current
    if (recorder && recorder.state !== 'inactive') recorder.stop()
    chunksRef.current = []
    setIsRecording(false)
  }, [])

  const stop = useCallback(async () => {
    if (autoStopRef.current) window.clearTimeout(autoStopRef.current)
    return stopNow()
  }, [stopNow])

  return { isRecording, start, stop, cancel, clipDurationMs: CLIP_DURATION_MS }
}
