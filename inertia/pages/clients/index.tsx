import { useState, useEffect } from 'react'
import { useRouter } from '@adonisjs/inertia/react'
import {
  Table,
  ColorSwatch,
  SearchField,
  Label,
  Description,
  Button,
  Input,
  Modal,
  Pagination,
} from '@heroui/react'

import { Link } from '@adonisjs/inertia/react'
import { InertiaProps } from '~/types'
import { Data } from '@generated/data'
import { formatCPF, debounce, getPageNumbers } from '~/util'

type PageProps = InertiaProps<{
  clients: {
    data: Data.Client[]
    metadata: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
      firstPage: number
    }
  }
  searchTerm: string
}>

import { COLOR_PRESETS } from '#constants/colors'

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0 || !parts[0]) return 'CL'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function ClientsIndex({ clients, searchTerm, flash }: PageProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handlePageChange = (page: number) => {
    router.visit(
      {
        route: 'clients.index',
      },
      {
        data: {
          q: searchTerm,
          page,
        },
        preserveState: true,
        preserveScroll: true,
      }
    )
  }

  useEffect(() => {
    if (flash?.generatedLink) {
      setGeneratedLink(flash.generatedLink)
      setIsModalOpen(true)
    }
  }, [flash?.generatedLink])

  const debouncedSearch = debounce((value: string) => {
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

  const getColorByCode = (code: string) => {
    return COLOR_PRESETS.find((c) => c.code.toLowerCase() === code.toLowerCase())
  }

  const handleGenerateLink = () => {
    router.visit({
      route: 'clients.generate_link',
    })
  }

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <div className="min-h-screen pb-16">
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
          <Link route="clients.create" className="button button--outline">
            Cadastrar
          </Link>
          <Button type="button" className="button button--primary" onPress={handleGenerateLink}>
            Gerar link de cadastro
          </Button>
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
              {clients.data.map((client) => {
                const currentColor = getColorByCode(client.favoriteColor)
                return (
                  <Table.Row key={client.id}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{client.fullName}</div>
                          <div className="text-xs text-slate-400 font-normal">
                            Cadastrado em{' '}
                            {client.createdAt
                              ? new Date(client.createdAt).toLocaleDateString('pt-BR')
                              : '-'}
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="font-mono text-slate-600 text-xs font-medium">
                        {formatCPF(client.cpf)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-slate-600 text-xs lowercase">{client.email}</span>
                    </Table.Cell>
                    <Table.Cell>
                      {currentColor ? (
                        <ColorSwatch
                          aria-label={currentColor.name}
                          color={currentColor.code}
                          size="xs"
                        />
                      ) : (
                        <ColorSwatch aria-label="Sem cor" color="rgba(4, 133, 247, 0)" size="xs" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-slate-500 max-w-xs truncate text-xs">
                        {client.notes || 'Sem observações'}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {clients.metadata.total > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <Pagination className="w-full flex items-center justify-between">
            <Pagination.Summary>
              Exibindo{' '}
              {Math.min(
                (clients.metadata.currentPage - 1) * clients.metadata.perPage + 1,
                clients.metadata.total
              )}
              -
              {Math.min(
                clients.metadata.currentPage * clients.metadata.perPage,
                clients.metadata.total
              )}{' '}
              de {clients.metadata.total} clientes
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={clients.metadata.currentPage <= 1}
                  onPress={() => handlePageChange(clients.metadata.currentPage - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Anterior</span>
                </Pagination.Previous>
              </Pagination.Item>

              {getPageNumbers(clients.metadata.currentPage, clients.metadata.lastPage).map(
                (item, idx) => (
                  <Pagination.Item key={idx}>
                    {item === 'ellipsis' ? (
                      <Pagination.Ellipsis />
                    ) : (
                      <Pagination.Link
                        isActive={item === clients.metadata.currentPage}
                        onPress={() => handlePageChange(item)}
                      >
                        {item}
                      </Pagination.Link>
                    )}
                  </Pagination.Item>
                )
              )}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={clients.metadata.currentPage >= clients.metadata.lastPage}
                  onPress={() => handlePageChange(clients.metadata.currentPage + 1)}
                >
                  <span>Próximo</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}

      <Modal>
        <Modal.Backdrop isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Link temporário de cadastro</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Este link é <strong>válido por 24 horas</strong>. Envie para o cliente realizar o
                  cadastro.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={generatedLink}
                      variant="secondary"
                      readOnly
                      className="w-full"
                    />
                    <Button type="button" onPress={handleCopyLink}>
                      {copied ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-xs text-emerald-600 font-medium">
                      ✓ Link copiado para a área de transferência!
                    </p>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" slot="close" className="button button--outline">
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  )
}
