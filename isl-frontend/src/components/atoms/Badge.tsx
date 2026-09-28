type Tone = 'neutral' | 'primary' | 'accent' | 'success' | 'danger'

interface BadgeProps {
  children: React.ReactNode
  tone?: Tone
  dot?: boolean
}

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-border/60 text-ink',
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/15 text-accent-dark',
  success: 'bg-success/15 text-success',
  danger: 'bg-danger/15 text-danger',
}

const dotClasses: Record<Tone, string> = {
  neutral: 'bg-muted',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  danger: 'bg-danger',
}

export default function Badge({ children, tone = 'neutral', dot }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[tone]}`} aria-hidden="true" />}
      {children}
    </span>
  )
}
