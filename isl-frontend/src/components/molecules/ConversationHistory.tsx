import { ClockIcon } from '@heroicons/react/24/outline'

/**
 * Placeholder for a future full conversation transcript view. For the MVP,
 * recognized phrases live in Favorites instead of a running history log.
 */
export default function ConversationHistory() {
  return (
    <div className="card mx-auto flex w-full max-w-md items-center gap-3 p-4 text-muted opacity-70">
      <ClockIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="text-sm">Full conversation history is coming in a future update.</p>
    </div>
  )
}
