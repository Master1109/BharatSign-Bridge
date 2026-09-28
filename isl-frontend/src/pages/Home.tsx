import { useCallback, useRef, useState } from 'react'
import { VideoCameraIcon, StopCircleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import Button from '@/components/atoms/Button'
import VideoPreview from '@/components/molecules/VideoPreview'
import CommunicationDisplay from '@/components/molecules/CommunicationDisplay'
import { useCamera } from '@/hooks/useCamera'
import { useFavoritesContext } from '@/context/FavoritesContext'
import { recognizeSign } from '@/services/api'
import { CaptureState, RecognitionResult } from '@/types'

export default function Home() {
  const { t } = useTranslation()

  const camera = useCamera()

  const {
    add,
    removeByText,
    isSaved: isFavorite,
  } = useFavoritesContext()

  const [state, setState] = useState<CaptureState>('idle')
  const [result, setResult] = useState<RecognitionResult | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])

  const handleStart = useCallback(async () => {
    setResult(null)

    const stream = await camera.start()

    if (!stream) {
      setState('permission-denied')
      return
    }

    recordedChunksRef.current = []

    try {
      const recorder = new MediaRecorder(stream)

      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      recorder.start()

      setState('recording')
    } catch (error) {
      console.error('Unable to start recording:', error)

      camera.stop()
      setState('error')
    }
  }, [camera])

  const handleStop = useCallback(() => {
    const recorder = mediaRecorderRef.current

    if (!recorder) return

    setState('processing')

    recorder.onstop = async () => {
      try {
        const clip = new Blob(recordedChunksRef.current, {
          type: recorder.mimeType || 'video/webm',
        })

        camera.stop()

        const recognition = await recognizeSign(clip)

        setResult(recognition)
        setState('result')
      } catch (error) {
        console.error('Recognition error:', error)

        camera.stop()
        setState('error')
      } finally {
        mediaRecorderRef.current = null
        recordedChunksRef.current = []
      }
    }

    recorder.stop()
  }, [camera])

  const handleCloseCamera = useCallback(() => {
    const recorder = mediaRecorderRef.current

    if (recorder) {
      recorder.onstop = null

      if (recorder.state !== 'inactive') {
        recorder.stop()
      }

      mediaRecorderRef.current = null
    }

    recordedChunksRef.current = []

    camera.stop()

    setResult(null)
    setState('idle')
  }, [camera])

  const handleRetry = useCallback(() => {
    setResult(null)
    setState('idle')
  }, [])

  const handleToggleSave = useCallback(() => {
    if (!result) return

    if (isFavorite(result.text)) {
      removeByText(result.text)
    } else {
      add(result)
    }
  }, [result, isFavorite, add, removeByText])

  const handleShare = useCallback(async () => {
    if (!result) return

    const shareText = `${result.text} (${Math.round(
      result.confidence * 100
    )}% confidence)`

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'ISL Connect',
          text: shareText,
        })

        return
      }

      await navigator.clipboard.writeText(shareText)
    } catch (error) {
      console.error('Share error:', error)
    }
  }, [result])

  return (
    <main
      className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
      aria-labelledby="home-title"
    >
      {/* Page heading */}
      <section className="mb-6 w-full text-center sm:mb-8">
        <h1
          id="home-title"
          className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
        >
          {t('BharatSign-Bridge')}
        </h1>

        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted sm:text-base">
          {t('home.subtitle')}
        </p>
      </section>

      {/* Camera preview */}
      <section
        className="w-full"
        aria-label="Sign language camera"
      >
        <div className="mx-auto w-full max-w-3xl">
          {camera.stream ? (
            <VideoPreview
              stream={camera.stream}
              state={state}
              onSwitchCamera={camera.switchCamera}
              canSwitchCamera={camera.status === 'active'}
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
              <div>
                <VideoCameraIcon
                  className="mx-auto mb-3 h-10 w-10 text-muted"
                  aria-hidden="true"
                />

                <p className="text-sm font-medium text-ink sm:text-base">
                  Camera is closed
                </p>

                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Start the camera to capture an Indian Sign Language gesture.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Camera status */}
      {camera.status === 'requesting' && (
        <p
          className="mt-4 text-sm text-muted"
          role="status"
          aria-live="polite"
        >
          Requesting camera permission...
        </p>
      )}

      {camera.status === 'denied' && (
        <div
          className="mt-4 w-full max-w-3xl rounded-lg border border-danger/30 bg-danger/10 p-4 text-center text-sm text-danger"
          role="alert"
        >
          Camera permission was denied. Please allow camera access and try
          again.
        </div>
      )}

      {camera.status === 'unsupported' && (
        <div
          className="mt-4 w-full max-w-3xl rounded-lg border border-danger/30 bg-danger/10 p-4 text-center text-sm text-danger"
          role="alert"
        >
          Your browser does not support camera access.
        </div>
      )}

      {/* Camera controls */}
      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8">
        {state === 'recording' ? (
          <Button
            variant="danger"
            size="lg"
            onClick={handleStop}
            type="button"
            className="min-h-12 min-w-48 focus-visible:ring-2 focus-visible:ring-danger"
            aria-label={t('capture.stop')}
          >
            <StopCircleIcon
              className="h-5 w-5"
              aria-hidden="true"
            />

            {t('capture.stop')}
          </Button>
        ) : (
          <>
            <Button
              variant="accent"
              size="lg"
              onClick={handleStart}
              disabled={state === 'processing'}
              type="button"
              className="min-h-12 min-w-48 focus-visible:ring-2 focus-visible:ring-primary"
              aria-busy={state === 'processing'}
            >
              <VideoCameraIcon
                className="h-5 w-5"
                aria-hidden="true"
              />

              {state === 'processing'
                ? t('capture.processing')
                : t('capture.start')}
            </Button>

            {camera.stream && (
              <Button
                variant="ghost"
                size="md"
                onClick={handleCloseCamera}
                type="button"
                className="min-h-11 min-w-32 focus-visible:ring-2 focus-visible:ring-primary"
              >
                Close Camera
              </Button>
            )}
          </>
        )}
      </div>

      {/* Recognition result */}
      <section className="mt-8 w-full">
        <CommunicationDisplay
          state={state}
          result={result}
          isSaved={result ? isFavorite(result.text) : false}
          onShare={handleShare}
          onToggleSave={handleToggleSave}
          onRetry={handleRetry}
        />
      </section>
    </main>
  )
}