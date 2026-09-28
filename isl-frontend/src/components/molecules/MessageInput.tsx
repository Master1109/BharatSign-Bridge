import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import InputField from '@/components/atoms/InputField'
import Button from '@/components/atoms/Button'

/**
 * Placeholder for future text/speech input, so a hearing user can type or
 * speak a reply that the signing user can read. Not wired to a backend yet.
 */
export default function MessageInput() {
  return (
    <div className="card mx-auto flex w-full max-w-md items-end gap-2 p-4 opacity-70">
      <div className="flex-1">
        <InputField
          label="Reply"
          placeholder="Type a reply\u2026 (coming soon)"
          disabled
          className="text-sm"
        />
      </div>
      <Button variant="ghost" size="md" disabled aria-label="Send message">
        <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  )
}
