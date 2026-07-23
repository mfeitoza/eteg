import { type Data } from '@generated/data'
import { Form, Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { type ReactElement, useEffect } from 'react'
import { Toast, toast, Button, Avatar } from '@heroui/react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { url } = usePage()
  useEffect(() => {
    toast.clear()
  }, [url])

  useEffect(() => {
    if (children.props.flash?.error) {
      toast.danger(children.props.flash.error, { timeout: 5000 })
    }
    if (children.props.flash?.success) {
      toast.success(children.props.flash.success, { timeout: 5000 })
    }
  })

  const user = children.props.user

  return (
    <>
      <main className="bg-slate-100 min-h-[calc(100vh-2.5rem)] pt-2">
        <div className="max-w-6xl mx-auto">
          <header className="bg-white rounded-full mb-4 shadow shadow-slate-200 border border-slate-300">
            <div className="px-4 h-10 flex items-center justify-between">
              <Link route="home" className="h-6">
                <img src="/logo.png" alt="ETEG Logo" className="h-full object-contain" />
              </Link>

              {user && (
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" className="size-6 text-[10px]">
                      <Avatar.Fallback>
                        {(user.fullName?.[0] || user.email[0]).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <span className="font-medium text-slate-700">
                      {user.fullName || user.email}
                    </span>
                  </div>

                  <Form route="session.destroy">
                    <Button type="submit" size="sm" variant="ghost">
                      Sair
                    </Button>
                  </Form>
                </div>
              )}
            </div>
          </header>
          <div className="px-5">{children}</div>
        </div>
      </main>
      <Toast.Provider />
    </>
  )
}
