import { useCallback, useEffect, useRef, useState } from 'react'

export type CameraStatus =
  | 'idle'
  | 'requesting'
  | 'active'
  | 'denied'
  | 'unsupported'

/**
 * Wraps getUserMedia camera access.
 * Requests permission, exposes the live stream,
 * supports switching between front/rear cameras,
 * and allows the camera to be stopped.
 */
export function useCamera() {
  const [status, setStatus] = useState<CameraStatus>('idle')
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
  const [stream, setStream] = useState<MediaStream | null>(null)

  const streamRef = useRef<MediaStream | null>(null)

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop()
    })

    streamRef.current = null
    setStream(null)
    setStatus('idle')
  }, [])

  const start = useCallback(
    async (mode: 'user' | 'environment' = facingMode) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus('unsupported')
        return null
      }

      setStatus('requesting')

      // Stop any existing camera before starting a new one.
      streamRef.current?.getTracks().forEach((track) => {
        track.stop()
      })

      streamRef.current = null
      setStream(null)

      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        })

        streamRef.current = newStream
        setStream(newStream)
        setFacingMode(mode)
        setStatus('active')

        return newStream
      } catch {
        setStatus('denied')
        return null
      }
    },
    [facingMode]
  )

  const switchCamera = useCallback(() => {
    const next =
      facingMode === 'user' ? 'environment' : 'user'

    return start(next)
  }, [facingMode, start])

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }, [])

  return {
    status,
    stream,
    start,
    stop,
    switchCamera,
    facingMode,
  }
}