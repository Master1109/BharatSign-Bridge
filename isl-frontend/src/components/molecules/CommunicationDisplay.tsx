import { useTranslation } from 'react-i18next'
import {
  ShareIcon,
  StarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { CaptureState, RecognitionResult } from '@/types'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'

interface CommunicationDisplayProps {
  state: CaptureState
  result: RecognitionResult | null
  isSaved: boolean
  onShare: () => void
  onToggleSave: () => void
  onRetry: () => void
}

function confidenceTone(confidence: number) {
  if (confidence >= 0.85) return 'success' as const
  if (confidence >= 0.6) return 'accent' as const
  return 'danger' as const
}

export default function CommunicationDisplay({
  state,
  result,
  isSaved,
  onShare,
  onToggleSave,
  onRetry,
}: CommunicationDisplayProps) {
  const { t } = useTranslation()

  return (
    <section
      className="card mx-auto w-full max-w-md p-4 sm:p-5"
      aria-labelledby="recognition-result-heading"
      aria-live="polite"
    >
      <h2
        id="recognition-result-heading"
        className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted"
      >
        {t('result.heading')}
      </h2>

      {/* Processing */}
      {state === 'processing' && (
        <div
          className="flex items-center gap-3 py-4 text-ink"
          role="status"
          aria-live="polite"
        >
          <LoadingSpinner label={t('capture.processing')} />

          <span className="text-sm">
            {t('capture.processing')}
          </span>
        </div>
      )}

      {/* Error */}
      {state === 'error' && (
        <div
          className="flex flex-col gap-3 py-2"
          role="alert"
        >
          <div className="flex items-start gap-2 text-danger">
            <ExclamationTriangleIcon
              className="mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />

            <div>
              <p className="text-sm font-medium">
                {t('capture.errorTitle')}
              </p>

              <p className="text-sm text-muted">
                {t('capture.errorBody')}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="self-start focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('capture.retry')}
          >
            {t('capture.retry')}
          </Button>
        </div>
      )}

      {/* Recognition result */}
      {state === 'result' && result && (
        <div className="flex flex-col gap-3">
          <p
            className="break-words text-lg font-medium leading-snug text-ink sm:text-xl"
            aria-label={`${t('result.heading')}: ${result.text}`}
          >
            {result.text}
          </p>

          <div>
            <Badge
              tone={confidenceTone(result.confidence)}
              dot
            >
              {t('result.confidence')}:{' '}
              {Math.round(result.confidence * 100)}%
            </Badge>
          </div>

          {/* Action buttons */}
          <div className="mt-1 flex flex-col gap-2 sm:flex-row">
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="w-full justify-center focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
              aria-label={`${t('result.share')}: ${result.text}`}
            >
              <ShareIcon
                className="h-4 w-4"
                aria-hidden="true"
              />

              {t('result.share')}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSave}
              aria-pressed={isSaved}
              aria-label={
                isSaved
                  ? t('result.unsave')
                  : t('result.save')
              }
              className="w-full justify-center focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
            >
              {isSaved ? (
                <StarIconSolid
                  className="h-4 w-4 text-accent"
                  aria-hidden="true"
                />
              ) : (
                <StarIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              )}

              {isSaved
                ? t('result.unsave')
                : t('result.save')}
            </Button>
          </div>
        </div>
      )}

      {/* Empty / idle states */}
      {(state === 'idle' ||
        state === 'recording' ||
        state === 'permission-denied') && (
        <p className="text-sm leading-relaxed text-muted">
          {t('result.empty')}
        </p>
      )}
    </section>
  )
}