import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowPathIcon,
  VideoCameraSlashIcon,
} from '@heroicons/react/24/outline'
import { CaptureState } from '@/types'

interface VideoPreviewProps {
  stream: MediaStream | null
  state: CaptureState
  onSwitchCamera: () => void
  canSwitchCamera: boolean
}

export default function VideoPreview({
  stream,
  state,
  onSwitchCamera,
  canSwitchCamera,
}: VideoPreviewProps) {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    video.srcObject = stream

    return () => {
      video.srcObject = null
    }
  }, [stream])

  const isRecording = state === 'recording'

  return (
    <section
      className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-card border border-border bg-ink/90 sm:aspect-video"
      aria-label={t('capture.idleTitle')}
    >
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full scale-x-[-1] object-cover"
          aria-label="Live camera preview"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-muted"
          role="status"
        >
          <VideoCameraSlashIcon
            className="h-10 w-10"
            aria-hidden="true"
          />

          <p className="text-sm">
            {t('capture.idleTitle')}
          </p>
        </div>
      )}

      {isRecording && (
        <div
          className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white"
          role="status"
          aria-label={t('capture.recording')}
        >
          <span
            className="relative flex h-2 w-2"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
          </span>

          {t('capture.recording')}
        </div>
      )}

      {stream && canSwitchCamera && (
        <button
          type="button"
          onClick={onSwitchCamera}
          aria-label={t('capture.switchCamera')}
          title={t('capture.switchCamera')}
          className="absolute right-3 top-3 rounded-full bg-black/60 p-2.5 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
        >
          <ArrowPathIcon
            className="h-5 w-5"
            aria-hidden="true"
          />
        </button>
      )}
    </section>
  )
}