import axios from 'axios'
import { RecognitionResult, RecognitionResultSchema } from '@/types'

/**
 * API communication layer for sign recognition.
 *
 * Point VITE_API_BASE_URL at your backend when it's ready. Until then,
 * this falls back to a local mock so the frontend is fully demoable
 * without a live model in the loop.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL
const USE_MOCK = !BASE_URL

const client = axios.create({
  baseURL: BASE_URL || undefined,
  timeout: 15000,
})

const MOCK_PHRASES = [
  'Hello, how are you?',
  'Thank you',
  'I need help',
  'Yes, I understand',
  'Where is the water?',
  'Nice to meet you',
]

function mockRecognize(): Promise<RecognitionResult> {
  return new Promise((resolve, reject) => {
    const delay = 1200 + Math.random() * 900
    window.setTimeout(() => {
      // Occasionally simulate a failed read so the error state is reachable in demos.
      if (Math.random() < 0.08) {
        reject(new Error('mock-recognition-failed'))
        return
      }
      const text = MOCK_PHRASES[Math.floor(Math.random() * MOCK_PHRASES.length)]
      resolve({
        text,
        confidence: Number((0.72 + Math.random() * 0.27).toFixed(2)),
        timestamp: new Date().toISOString(),
      })
    }, delay)
  })
}

/** Converts a recorded video Blob to a base64 data string for transmission. */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Sends a captured video clip for sign recognition and returns the
 * validated result. Retries once on transient network failure.
 */
export async function recognizeSign(
  clip: Blob,
  attempt = 0
): Promise<RecognitionResult> {
  if (USE_MOCK) {
    return mockRecognize()
  }

  try {
    const video = await blobToBase64(clip)
    const { data } = await client.post('/recognize', { video })
    return RecognitionResultSchema.parse(data)
  } catch (err) {
    if (attempt < 1) {
      await new Promise((r) => window.setTimeout(r, 800))
      return recognizeSign(clip, attempt + 1)
    }
    throw err
  }
}

export const apiConfig = { USE_MOCK, BASE_URL }
