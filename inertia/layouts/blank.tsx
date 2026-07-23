import { type Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { type ReactElement, useEffect } from 'react'
import { Toast, toast } from '@heroui/react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { url } = usePage()
  useEffect(() => {
    toast.clear()
  }, [url])

  return (
    <>
      <main className="bg-slate-100 min-h-[calc(100vh-2.5rem)]">
        <div className="max-w-6xl mx-auto">
          <div className="px-5">{children}</div>
        </div>
      </main>
      <Toast.Provider />
    </>
  )
}
