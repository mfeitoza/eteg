import { type Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { type ReactElement, useEffect } from 'react'
import { Toast, toast } from '@heroui/react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { url } = usePage()
  useEffect(() => {
    toast.clear()
  }, [url])

  useEffect(() => {
    if (children.props.flash.error) {
      toast.danger(children.props.flash.error, { timeout: 5000 })
    }
    if (children.props.flash.success) {
      toast.success(children.props.flash.success, { timeout: 5000 })
    }
  })

  return (
    <>
      <Toast.Provider />
      <main className="bg-slate-100">{children}</main>
    </>
  )
}
