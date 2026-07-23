import { Link } from '@adonisjs/inertia/react'
import { Card } from '@heroui/react'
import { Head } from '@inertiajs/react'

export default function InvalidLink() {
  return (
    <>
      <Head title="Link inválido" />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full text-center ">
          <Card.Header className="flex flex-col items-center gap-4 p-0">
            <Card.Title className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Link inválido ou expirado
            </Card.Title>
            <Card.Description className="text-sm text-slate-500 leading-relaxed">
              O link ultrapassou a validade de 24 horas.
            </Card.Description>
          </Card.Header>

          <Card.Footer className="flex flex-col">
            <Link route="home" className="button button--outline">
              Ir para a página inicial
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </>
  )
}
