import { Form } from '@adonisjs/inertia/react'
import { Card, Button, Input, Label, TextField, FieldError } from '@heroui/react'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center">
        <img src="/logo.png" alt="etag logo" />
      </div>
      <Card className="w-full max-w-md">
        <Card.Header>
          <Card.Title className="text-2xl font-bold">Login</Card.Title>
          <Card.Description></Card.Description>
        </Card.Header>

        <Card.Content>
          <Form route="session.store" className="space-y-4">
            {({ errors, processing, clearErrors }) => (
              <>
                <TextField name="email" type="email" isInvalid={!!errors.email}>
                  <Label isRequired>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    autoComplete="username"
                    onChange={() => clearErrors('email')}
                  />
                  <FieldError>{errors.email}</FieldError>
                </TextField>

                <TextField name="password" type="password" isInvalid={!!errors.password}>
                  <Label isRequired>Senha</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    onChange={() => clearErrors('password')}
                  />
                  <FieldError>{errors.password}</FieldError>
                </TextField>

                <Button type="submit" isDisabled={processing} className="w-full mt-2">
                  {processing ? 'Entrando...' : 'Entrar'}
                </Button>
              </>
            )}
          </Form>
        </Card.Content>
      </Card>
    </div>
  )
}
