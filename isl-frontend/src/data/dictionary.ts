import { DictionaryEntry } from '@/types'

/**
 * Sample ISL dictionary — the signs this MVP can currently recognize.
 * Replace/extend as the recognition model's vocabulary grows.
 */
export const dictionary: DictionaryEntry[] = [
  {
    id: 'd1',
    sign: 'Hello',
    meaning: 'Hello / Greeting',
    category: 'Greetings',
    description: 'Open palm raised near the forehead, moved outward in a small arc.',
  },
  {
    id: 'd2',
    sign: 'Thank you',
    meaning: 'Thank you',
    category: 'Greetings',
    description: 'Fingertips touch the chin, then the hand moves forward and down.',
  },
  {
    id: 'd3',
    sign: 'Yes',
    meaning: 'Yes / Agreement',
    category: 'Responses',
    description: 'A closed fist nods up and down at the wrist, like a small nod.',
  },
  {
    id: 'd4',
    sign: 'No',
    meaning: 'No / Disagreement',
    category: 'Responses',
    description: 'Index and middle finger tap the thumb twice, like a small snap.',
  },
  {
    id: 'd5',
    sign: 'Help',
    meaning: 'Help / Assistance needed',
    category: 'Needs',
    description: 'One flat hand lifts the other closed fist upward from below.',
  },
  {
    id: 'd6',
    sign: 'Water',
    meaning: 'Water / Thirsty',
    category: 'Needs',
    description: 'The letter "W" handshape taps twice near the mouth.',
  },
  {
    id: 'd7',
    sign: 'Name',
    meaning: 'Name / What is your name',
    category: 'Introductions',
    description: 'Index and middle fingers of both hands tap together crosswise.',
  },
  {
    id: 'd8',
    sign: 'Understand',
    meaning: 'I understand',
    category: 'Responses',
    description: 'A curled index finger flicks open near the temple.',
  },
]
