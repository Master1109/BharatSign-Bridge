import { z } from 'zod'

/** A single recognized ISL phrase returned by the recognition service. */
export const RecognitionResultSchema = z.object({
  text: z.string().min(1),
  confidence: z.number().min(0).max(1),
  timestamp: z.string(),
})
export type RecognitionResult = z.infer<typeof RecognitionResultSchema>

/** One entry in the ISL dictionary shown to users. */
export const DictionaryEntrySchema = z.object({
  id: z.string(),
  sign: z.string(),
  meaning: z.string(),
  category: z.string(),
  description: z.string(),
})
export type DictionaryEntry = z.infer<typeof DictionaryEntrySchema>

/** UI states the capture flow can be in. */
export type CaptureState =
  | 'idle'
  | 'permission-denied'
  | 'recording'
  | 'processing'
  | 'result'
  | 'error'

/** A saved favorite — a recognition result the user chose to keep. */
export interface Favorite {
  id: string
  text: string
  confidence: number
  savedAt: string
}

export interface FeedbackFormValues {
  rating: number
  comment: string
}
