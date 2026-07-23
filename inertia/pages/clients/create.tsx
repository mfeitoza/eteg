import { useState } from 'react'
import { Link, Form } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import {
  Button,
  Input,
  Label,
  TextArea,
  TextField,
  Description,
  FieldError,
  ColorSwatchPicker,
  parseColor,
} from '@heroui/react'
import { COLOR_PRESETS } from '~/constants/colors'
import { formatCPF } from '~/util'
import { type InertiaProps } from '~/types'

type PageProps = InertiaProps<{ action: string }>

export default function ClientCreate({ action }: PageProps) {
  const [cpf, setCpf] = useState('')
  const [favoriteColor, setFavoriteColor] = useState(parseColor(COLOR_PRESETS[0].code))
  const [notes, setNotes] = useState('')

  let currentColor = COLOR_PRESETS.find((color) => color.code === favoriteColor.toString('hex'))

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value))
  }

  return (
    <>
      <Head title="Cadastro" />
      <div className="min-h-screen pb-16">
        <div className="">
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Bem-vindo cliente
          </h1>
          <p className="mt-0.5 text-base text-slate-500">Preencha os dados no formulário abaixo.</p>
        </div>

        <div className="mt-6 max-w-3xl">
          <Form action={action} method="POST" className="space-y-4">
            {({ errors, processing, clearErrors }) => (
              <>
                <TextField name="fullName" isInvalid={!!errors['fullName']}>
                  <Label isRequired>Nome completo</Label>
                  <Input
                    placeholder="ex: Ana Maria Silva"
                    id="fullName"
                    name="fullName"
                    onChange={() => clearErrors('fullName')}
                  />
                  <FieldError>{errors['fullName']}</FieldError>
                </TextField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <TextField name="cpf" isInvalid={!!errors['cpf']}>
                    <Label isRequired>CPF</Label>
                    <Input
                      placeholder="000.000.000-00"
                      id="cpf"
                      name="cpf"
                      maxLength={14}
                      value={cpf}
                      onChange={(e) => {
                        clearErrors('cpf')
                        handleCPFChange(e)
                      }}
                    />
                    <FieldError>{errors['cpf']}</FieldError>
                  </TextField>

                  <TextField name="email" type="email" isInvalid={!!errors['email']}>
                    <Label isRequired>E-mail</Label>
                    <Input
                      placeholder="cliente@exemplo.com"
                      id="email"
                      name="email"
                      onChange={() => clearErrors('email')}
                    />
                    <FieldError>{errors['email']}</FieldError>
                  </TextField>
                </div>

                <div>
                  <TextField
                    name="favoriteColor"
                    type="favoriteColor"
                    isInvalid={!!errors['favoriteColor']}
                  >
                    <Label isRequired>Cor favorita</Label>
                    <Input name="favoriteColor" value={currentColor?.code} hidden />
                    <ColorSwatchPicker value={favoriteColor} onChange={setFavoriteColor}>
                      {COLOR_PRESETS.map(({ code }) => (
                        <ColorSwatchPicker.Item key={code} color={code}>
                          <ColorSwatchPicker.Swatch />
                          <ColorSwatchPicker.Indicator />
                        </ColorSwatchPicker.Item>
                      ))}
                    </ColorSwatchPicker>
                    <FieldError>{errors['favoriteColor']}</FieldError>
                  </TextField>
                </div>

                <TextField name="notes">
                  <Label>Observações / Preferências</Label>
                  <TextArea
                    placeholder="Adicione observações ou preferências do cliente..."
                    rows={2}
                    onChange={(e) => {
                      setNotes(e.target.value)
                    }}
                  />
                  <Description className="text-[11px] text-slate-400 mt-1">
                    {notes.length}/256 caracteres
                  </Description>
                </TextField>

                <div className="flex items-center justify-end gap-3">
                  <Link route="home" className="button button--outline">
                    Cancelar
                  </Link>
                  <Button type="submit" isDisabled={processing}>
                    {processing ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </>
  )
}
