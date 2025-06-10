# Marquei API

API de agendamentos para negócios desenvolvida com NestJS, Prisma e PostgreSQL.

## Requisitos

- Node.js (v18+)
- PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd marquei-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as seguintes variáveis:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/marquei?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
```

4. Execute as migrações do banco de dados:
```bash
npm run prisma:migrate
```

5. Gere o cliente Prisma:
```bash
npm run prisma:generate
```

## Executando a aplicação

```bash
# desenvolvimento
npm run start:dev

# produção
npm run build
npm run start:prod
```

## Documentação da API

A documentação da API está disponível através do Swagger UI em:
```
http://localhost:3000/api
```

## Endpoints principais

### Autenticação
- POST /auth/login - Login do negócio

### Agendamentos
- POST /agendamentos - Criar novo agendamento
- GET /agendamentos/negocio/:id - Listar agendamentos de um negócio
- PUT /agendamentos/:id/status - Atualizar status do agendamento

## Testes

```bash
# testes unitários
npm run test

# testes e2e
npm run test:e2e

# cobertura de testes
npm run test:cov
```

## Estrutura do Projeto

```
src/
  ├── auth/           # Módulo de autenticação
  ├── agendamentos/   # Módulo de agendamentos
  ├── prisma/         # Serviço e configuração do Prisma
  └── main.ts         # Ponto de entrada da aplicação
```

## Recursos

- Autenticação JWT
- Validação de dados com class-validator
- Documentação com Swagger
- Testes unitários
- Conexão com PostgreSQL via Prisma
- CORS habilitado
