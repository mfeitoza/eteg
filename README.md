# ETEG - Gestão de clientes

Aplicação web desenvolvida para gerenciamento e cadastro de clientes, contando com autenticação de usuários e geração de links temporários de convite para cadastro.

---

## 🚀 Funcionalidades

- **Autenticação de Usuários**: Sistema de login e logout seguro utilizando sessões.
- **Gestão de Clientes**:
  - Visualização e listagem dos clientes cadastrados.
  - Formulário de cadastro de clientes com validação de dados.
  - Busca otimizada (indexação por nome completo).
- **Links Temporários de Cadastro**:
  - Geração de links de convite com validade de 24 horas e de uso único para cadastro de novos clientes por usuários não autenticados.
- **Interface Responsiva & Moderna**: Experiência de usuário fluida com renderização reativa no frontend e componentes modernos.

---

## 🛠️ Tech Stack

### Backend

- **[AdonisJS 6](https://adonisjs.com/)** - Framework Node.js robusto em TypeScript.
- **Lucid ORM** - Mapeamento objeto-relacional para interação com banco de dados (PostgreSQL / SQLite).
- **VineJS** - Biblioteca de validação de dados rápida e tipada.

### Frontend

- **[React 19](https://react.dev/)** - Biblioteca para construção da interface de usuário.
- **[Inertia.js](https://inertiajs.com/)** - Integração monolítica transparente entre AdonisJS e React.
- **[HeroUI](https://heroui.com/)** & **Tailwind CSS v4** - Biblioteca de componentes e estilização baseada em utilitários.
- **Vite** - Bundler e servidor de desenvolvimento ultrarrápido com HMR.

---

## 📦 Como Executar

### Pré-requisitos

- **Node.js**: `>= 24.0.0`
- **PNPM** (ou npm/yarn)

### Passos

1. **Instalar as dependências:**

   ```bash
   pnpm install
   ```

2. **Configurar as variáveis de ambiente:**

   ```bash
   cp .env.example .env
   ```

3. **Executar as migrações do banco de dados:**

   ```bash
   node ace migration:run
   ```

4. **Opcional efetuar o seed do banco de dados:**

   ```bash
   node ace db:seed
   ```

5. **Iniciar o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

Acesse no navegador: `http://localhost:3333`
