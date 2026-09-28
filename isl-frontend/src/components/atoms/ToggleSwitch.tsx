import { Switch } from '@headlessui/react'

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  hideLabel?: boolean
}

export default function ToggleSwitch({ checked, onChange, label, hideLabel }: ToggleSwitchProps) {
  return (
    <Switch.Group as="div" className="flex items-center gap-2.5">
      {!hideLabel && <Switch.Label className="text-sm text-ink">{label}</Switch.Label>}
      <Switch
        checked={checked}
        onChange={onChange}
        aria-label={hideLabel ? label : undefined}
        className={`${checked ? 'bg-primary' : 'bg-border'}
          relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors`}
      >
        <span
          className={`${checked ? 'translate-x-5' : 'translate-x-1'}
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </Switch.Group>
  )
}
