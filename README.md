

# 🚀 Projeto Fullstack com Docker, Drizzle ORM e Node.js

Este é um projeto fullstack moderno, utilizando:
- **Frontend**: `web/` (React, Next.js ou sua stack)
- **Backend**: `server/` (Node.js + TypeScript + Drizzle ORM)
- **Banco de dados**: PostgreSQL com suporte a `pgvector` (via Docker)
- **Orquestração**: Docker Compose + scripts na raiz para facilitar o desenvolvimento

Tudo configurado para rodar com **um único comando**.



# Screenshots

![Website Screenshot](./assets/website-screenshot.png)
![Website Screenshot 2](./assets/website-screenshot-2.png)
![Responsive Website Screenshot](./assets/website-screenshot.png)


## 🛠️ Pré-requisitos
Antes de começar, instale as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)


## 🚀 Como rodar o projeto

Siga os passos abaixo para configurar e executar o projeto localmente:

### 1. Clone o repositório
```bash
git clone https://github.com/CarlaRochaBovi/project-flow.git
cd project-flow
```

### 2. Copie o arquivo de ambiente
```bash
cp .env.example .env
```
> ✅ Edite o `.env` se necessário (ex: alterar senha, porta ou URL do banco).

### 3. Instale as dependências
```bash
npm install
```
> Isso instala `concurrently` e `wait-on`, usados para orquestrar os serviços.

### 4. Inicie a aplicação
```bash
npm run dev
```

Esse comando:
- Inicia o banco de dados PostgreSQL com `pgvector` (via Docker)
- Aguarda o banco estar pronto (até 30 segundos)
- Inicia o backend (`server`) em `http://localhost:3333`
- Inicia o frontend (`web`) em `http://localhost:3000`

✅ Tudo em um único terminal, com saída colorida e fácil de acompanhar!


## 🖥️ URLs de acesso

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:3333](http://localhost:3333)
- **Banco de dados**: `localhost:5432` (PostgreSQL, usuário: `docker`, senha: `docker`, banco: `projects`)

---

## 🧰 Scripts úteis

| Comando | Descrição |
|--------|-----------|
| `npm run dev` | Inicia tudo: banco, backend e frontend |
| `npm run db:up` | Inicia apenas o banco de dados |
| `npm run db:down` | Para e remove o container do banco |
| `npm run db:logs` | Mostra os logs do banco em tempo real |
| `npm run dev:server` | Inicia apenas o backend |
| `npm run dev:web` | Inicia apenas o frontend |

---

## 🔐 Variáveis de ambiente

O arquivo `.env` é usado para configurar o ambiente. Use o exemplo abaixo para criar o seu:

### `.env.example`
```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/projects
NODE_ENV=development
```

> ⚠️ O arquivo `.env` **não é versionado** (está no `.gitignore`) por segurança. Sempre use `.env.example` como base.

---

## 🐳 Tecnologias utilizadas

- **Frontend**: React / TypeScript
- **Backend**: Node.js + TypeScript + Fastify
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) (migrações e consultas fortemente tipadas)
- **Banco de dados**: [PostgreSQL](https://www.postgresql.org/) + [pgvector](https://github.com/pgvector/pgvector) (para embeddings e AI)
- **Containerização**: Docker + Docker Compose
- **Validação de ambiente**: [Zod](https://zod.dev/) (com `env.ts`)
- **Orquestração**: `concurrently` + `wait-on` para controle de inicialização

---

## 📂 Estrutura do projeto

```
project/
├── .env
├── .env.example
├── docker-compose.yml       # Banco de dados (PostgreSQL + pgvector)
├── package.json             # Scripts de orquestração (na raiz)
├── server/                  # Backend
│   ├── src/
│   │   ├── env.ts           # Validação com Zod
│   │   └── index.ts         # Servidor
│   ├── migrations/          # Migrações do Drizzle
│   ├── schema/              # Schema do Drizzle
│   └── package.json
├── web/                     # Frontend
│   ├── src/
│   └── package.json
└── README.md
```



## 🔄 Migrações com Drizzle

Após modificar o schema, gere uma nova migração:



#### Dentro da pasta server

```bash
cd server
npx drizzle-kit generate
```

As migrações são armazenadas na pasta `server/migrations/` e devem ser aplicadas ao banco. Você pode aplicá-las manualmente ou automatizar no início do backend.

> 🔁 Dica: Adicione a aplicação de migrações no `server` ao iniciar, ou use um script antes de `npm run dev`.


---


Feito com ❤️ por Carla