import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ChatBubbleLeftRightIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Button from '@/components/atoms/Button'
import { FeedbackFormValues } from '@/types'

const TEAM_EMAIL = 'team@islconnect.example'

export default function FeedbackButton() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<FeedbackFormValues>({
    defaultValues: { rating: 0, comment: '' },
  })
  const rating = watch('rating')

  const close = () => {
    setIsOpen(false)
    reset()
  }

  const onSubmit = (values: FeedbackFormValues) => {
    const subject = encodeURIComponent(t('feedback.subject'))
    const body = encodeURIComponent(
      `Rating: ${values.rating || 'n/a'}/5\n\nComments:\n${values.comment || '(none)'}\n\n\u2014 Sent from ISL Connect`
    )
    window.location.href = `mailto:${TEAM_EMAIL}?subject=${subject}&body=${body}`
    close()
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
        <ChatBubbleLeftRightIcon className="h-4 w-4" aria-hidden="true" />
        {t('feedback.button')}
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="card w-full max-w-sm p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Dialog.Title className="text-base font-semibold text-ink">
                    {t('feedback.title')}
                  </Dialog.Title>
                  <button
                    onClick={close}
                    aria-label={t('common.close')}
                    className="rounded-full p-1 text-muted hover:bg-base"
                  >
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-ink">
                      {t('feedback.ratingLabel')}
                    </legend>
                    <Controller
                      name="rating"
                      control={control}
                      render={({ field }) => (
                        <div className="flex gap-1" role="radiogroup" aria-label={t('feedback.ratingLabel')}>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              role="radio"
                              aria-checked={field.value === n}
                              aria-label={`${n} star${n > 1 ? 's' : ''}`}
                              onClick={() => field.onChange(n)}
                              className="rounded p-0.5"
                            >
                              {n <= rating ? (
                                <StarIconSolid className="h-7 w-7 text-accent" aria-hidden="true" />
                              ) : (
                                <StarIcon className="h-7 w-7 text-muted" aria-hidden="true" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </fieldset>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="feedback-comment" className="text-sm font-medium text-ink">
                      {t('feedback.commentLabel')}
                    </label>
                    <textarea
                      id="feedback-comment"
                      rows={3}
                      placeholder={t('feedback.commentPlaceholder')}
                      className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted"
                      {...register('comment')}
                    />
                  </div>

                  <p className="text-xs text-muted">{t('feedback.emailSentHint')}</p>

                  <div className="flex justify-end gap-2 pt-1">
                    <Button type="button" variant="ghost" size="sm" onClick={close}>
                      {t('feedback.cancel')}
                    </Button>
                    <Button type="submit" variant="accent" size="sm" disabled={isSubmitting}>
                      {t('feedback.send')}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
