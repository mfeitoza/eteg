import { useState } from 'react'
import { Link, useRouter,  } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { Table, ColorSwatch, SearchField, Label, Description } from '@heroui/react'

import { InertiaProps } from '~/types'
import { Data } from '@generated/data'
import { formatCPF } from '../../util'

type PageProps = InertiaProps<{ clients: Data.Client[], searchTerm: string }>

export interface RainbowColor {
  name: string
  code: string
}

export const COLOR_PRESETS: RainbowColor[] = [
  { name: 'Vermelho', code: '#FF0000' },
  { name: 'Laranja', code: '#FF7F00' },
  { name: 'Amarelo', code: '#FFFF00' },
  { name: 'Verde', code: '#00FF00' },
  { name: 'Azul', code: '#0000FF' },
  { name: 'Anil', code: '#4B0082' },
  { name: 'Violeta', code: '#8B00FF' },
] as const

// Helper: Gera as iniciais do nome do cliente
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0 || !parts[0]) return 'CL'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export default function ClientsIndex({ clients, searchTerm }: PageProps) {
  const router = useRouter()
  const page = usePage<PageProps>()

  const debouncedSearch = debounce((value: string) => {
    console.log('search', value)
    router.visit(
      {
        route: 'clients.index',
      },
      {
        data: {
          q: value,
        },
        preserveState: true,
        preserveScroll: true,
      }
    )
  }, 500)

  console.log('searchTerm', searchTerm)

  const getColorByCode = (code: string) => {
    return COLOR_PRESETS.find((c) => c.code.toLowerCase() === code.toLowerCase())
  }

  return (
    <div className="min-h-screen  pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 ">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Lista de Clientes
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Visualização tabular e gerenciamento de cadastros de clientes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link route="clients.create" className="button button--primary">
              Novo cliente
            </Link>
          </div>
        </div>

        <div className="w-xl mb-4">
          <SearchField name="search" defaultValue={searchTerm}>
            <Label>Pesquisar</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-70"
                placeholder="Pesquisar..."
                onChange={(e) => debouncedSearch(e.target.value)}
              />
              <SearchField.ClearButton />
            </SearchField.Group>
            <Description>Pesquise por nome, cpf ou email</Description>
          </SearchField>
        </div>

        <Table variant="primary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Lista de Clientes">
              <Table.Header>
                <Table.Column isRowHeader>Nome</Table.Column>
                <Table.Column>CPF</Table.Column>
                <Table.Column>E-mail</Table.Column>
                <Table.Column>Cor favorita</Table.Column>
                <Table.Column>Observações</Table.Column>
              </Table.Header>
              <Table.Body>
                {clients.map((client) => {
                  const currentColor = getColorByCode(client.favoriteColor)
                  return (
                    <Table.Row key={client.id}>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold text-slate-900">{client.fullName}</div>
                            <div className="text-xs text-slate-400 font-normal">
                              Cadastrado em {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="font-mono text-slate-600 text-xs font-medium">
                        {formatCPF(client.cpf)}
                      </Table.Cell>
                      <Table.Cell className="text-slate-600">{client.email}</Table.Cell>
                      <Table.Cell className="flex items-center gap-2">
                        {currentColor ? (
                          <ColorSwatch
                            aria-label={currentColor.name}
                            color={currentColor.code}
                            size="xs"
                          />
                        ) : (
                          <ColorSwatch
                            aria-label="Sem cor"
                            color="rgba(4, 133, 247, 0)"
                            size="xs"
                          />
                        )}
                      </Table.Cell>
                      <Table.Cell className="text-slate-500 max-w-xs truncate text-xs">
                        {client.notes || 'Sem observações'}
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  )
}
