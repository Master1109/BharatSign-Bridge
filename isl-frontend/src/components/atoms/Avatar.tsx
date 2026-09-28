interface AvatarProps {
  name: string
  size?: number
}

/** Simple initials avatar — no external image dependency needed. */
export default function Avatar({ name, size = 36 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className="flex items-center justify-center rounded-full bg-primary font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      role="img"
      aria-label={name}
    >
      {initials}
    </div>
  )
}
