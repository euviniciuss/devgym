<p align="center">
  <img src="https://img.shields.io/badge/DevGym-FF6B35?style=for-the-badge&logo=codeforces&logoColor=white" alt="DevGym Logo" width="50%">
</p>

## 💡 DevGym
API REST para gerenciamento de check-ins em academias com validação por geolocalização, autenticação JWT e controle de acesso baseado em papéis (RBAC).

## ℹ Sobre o projeto
O DevGym é uma aplicação backend desenvolvida seguindo princípios de **Arquitetura Limpa** e **Domain-Driven Design**, com clara separação entre camadas de controllers, use-cases (regras de negócio) e repositórios.

A API permite que usuários se cadastrem, encontrem academias próximas, realizem check-ins com validação de proximidade (até 100m de distância via fórmula de Haversine) e administradores gerenciem academias e validem check-ins.

## 🛠 Tecnologias
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📋 Funcionalidades

- **Autenticação JWT** com refresh token armazenado em cookie HTTP-only
- **Cadastro e autenticação** de usuários com senha hasheada (bcryptjs)
- **Gerenciamento de academias** (criação, busca textual, busca por proximidade)
- **Check-in** com validação de distância máxima de 100m usando fórmula de Haversine
- **Validação de check-ins** por administradores (janela de 20 minutos)
- **Histórico e métricas** de check-ins por usuário
- **Controle de acesso** por papéis (MEMBER / ADMIN)

### Endpoints

| Método | Rota | Autenticação | Papel | Descrição |
|--------|------|-------------|-------|-----------|
| `POST` | `/users` | ❌ | - | Cadastrar novo usuário |
| `POST` | `/sessions` | ❌ | - | Autenticar (login) |
| `PATCH` | `/token/refresh` | ❌* | - | Atualizar token de acesso |
| `GET` | `/me` | ✅ | Qualquer | Obter perfil do usuário logado |
| `GET` | `/gyms/search?q=&page=` | ✅ | Qualquer | Buscar academias por nome |
| `GET` | `/gyms/nearby?latitude=&longitude=` | ✅ | Qualquer | Listar academias próximas (10km) |
| `POST` | `/gyms` | ✅ | ADMIN | Criar nova academia |
| `POST` | `/gyms/:gymId/check-ins` | ✅ | Qualquer | Realizar check-in |
| `GET` | `/check-ins/history?page=` | ✅ | Qualquer | Histórico de check-ins |
| `GET` | `/check-ins/metrics` | ✅ | Qualquer | Métricas do usuário |
| `PATCH` | `/check-ins/:checkInId/validate` | ✅ | ADMIN | Validar um check-in |

*\* Refresh token lido do cookie `refreshToken`*

## 🗄 Estrutura do projeto

```
src/
├── app.ts                          # Configuração do Fastify
├── server.ts                       # Inicialização do servidor
├── env/                            # Validação de variáveis de ambiente (Zod)
├── lib/                            # Singleton do Prisma client
├── utils/                          # Utilitários (Haversine)
├── middlewares/                     # Verificação JWT e RBAC
├── http/controllers/               # Rotas e handlers HTTP
│   ├── users/                      # Cadastro, autenticação, perfil, refresh
│   ├── gyms/                       # CRUD, busca, academias próximas
│   └── check-ins/                  # Criação, histórico, métricas, validação
├── use-cases/                      # Regras de negócio
├── repositories/                   # Interfaces e implementações (Prisma + in-memory)
└── factories/                      # Fábricas para injeção de dependência
```

## ▶️ Como rodar

### Pré-requisitos
- **[Node.js](https://nodejs.org/en)** instalado globalmente
- **[Docker](https://www.docker.com/)** instalado globalmente

### Versões utilizadas

| Tecnologia | Versão |
|------------|--------|
| Node.js | ^22 |
| Fastify | ^5 |
| TypeScript | ^6 |
| Prisma | ^7 |
| PostgreSQL | 16 |

### Passo a passo

1. Clone o repositório:
```sh
git clone https://github.com/euviniciuss/devgym
```

2. Suba o banco PostgreSQL com Docker Compose:
```sh
docker compose up -d
```

3. Configure as variáveis de ambiente:
```sh
cp .env.example .env
# Edite o .env com suas configurações
```

4. Instale as dependências:
```sh
npm install
```

5. Execute as migrations do Prisma:
```sh
npx prisma migrate dev
```

6. Inicie o servidor em modo desenvolvimento:
```sh
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

## 🧪 Testes

O projeto possui **testes unitários** e **testes e2e** utilizando Vitest.

### Testes unitários
Testam os use-cases isoladamente com repositórios em memória.

```sh
npm test
```

### Testes e2e
Testam a API completa via HTTP (supertest). Requerem o banco PostgreSQL rodando.

```sh
npm run test:e2e
```

### Coverage
```sh
npm run test:coverage
```

### Modo watch
```sh
npm run test:watch      # unitários
npm run test:e2e:watch  # e2e
```

## 🚀 Contribuidores

<a href="https://github.com/euviniciuss/devgym/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=euviniciuss/devgym" alt="contribuitors image">
</a>
