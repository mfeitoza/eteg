import type { ReactElement } from 'react'
import type { Data } from '@generated/data'
import { Link } from '@adonisjs/inertia/react'
import { Button, Card } from '@heroui/react'
import BlankLayout from '~/layouts/blank'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-2xl inline-block">
            <img src="/logo.png" alt="ETEG Logo" className="h-16 w-auto object-contain mx-auto" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Teste técnico
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            Plataforma para cadastro de clientes.
          </p>
        </div>

        <Card className="bg-white border border-slate-200/80 shadow-lg rounded-2xl p-6 sm:p-8 text-left space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Sobre o Sistema</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Acompanhe sua base de clientes com facilidade, gere convites de cadastro com links de
              validade temporária e mantenha todas as informações organizadas de forma segura e
              prática.
            </p>
          </div>
        </Card>
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-slate-500 font-medium">
            Acesse a área administrativa
          </span>
          <Link route="session.create">
            <Button>Entrar</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

Home.layout = (page: ReactElement<Data.SharedProps>) => <BlankLayout>{page}</BlankLayout>
