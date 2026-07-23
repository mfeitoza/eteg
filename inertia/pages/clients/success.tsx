import { Card } from '@heroui/react'
import { Head } from '@inertiajs/react'

export default function ClientSuccess() {
  return (
    <>
      <Head title="Cadastro efetuado!" />
      <div className="min-h-screen flex items-center justify-center p-4 pb-16">
        <Card className="max-w-md w-full p-8 text-center bg-white shadow-sm border border-slate-200 rounded-2xl">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Cadastro efetuado!
          </h1>

          <p className="mt-2 text-sm text-slate-500">O cadastro foi efetuado com sucesso.</p>
        </Card>
      </div>
    </>
  )
}
