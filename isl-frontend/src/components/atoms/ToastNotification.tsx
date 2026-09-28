export type ToastTone = 'info' | 'success' | 'danger'

interface ToastNotificationProps {
  message: string
  tone?: ToastTone
}

const toneClasses: Record<ToastTone, string> = {
  info: 'bg-ink text-base',
  success: 'bg-success text-white',
  danger: 'bg-danger text-white',
}

export default function ToastNotification({ message, tone = 'info' }: ToastNotificationProps) {
  return (
    <div
      className={`pointer-events-auto max-w-sm rounded-full px-4 py-2.5 text-sm font-medium shadow-lg ${toneClasses[tone]}`}
    >
      {message}
    </div>
  )
}
