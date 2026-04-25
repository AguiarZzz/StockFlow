StockFlow

Sistema de controle de estoque com operações de entrada e saída de produtos, desenvolvido com foco em aprendizado de backend moderno e integração fullstack.

Objetivo

O projeto tem como objetivo:

Gerenciar produtos e seus estoques
Registrar movimentações de entrada (IN) e saída (OUT)
Validar regras de negócio (ex: não permitir saída maior que o estoque)
Servir como projeto de portfólio fullstack

Stack utilizada
Backend
Node.js
Express
TypeScript
Prisma ORM
SQLite
Frontend
Vue 3
TypeScript
Vite

Como rodar o projeto
Backend
1. Acesse a pasta
cd backend
2. Instale as dependências
npm install
3. Configure o banco (Prisma)
npx prisma migrate dev
4. Rodar seed (dados iniciais)
npx prisma db seed
5. Iniciar o servidor
npm run dev

Backend rodando em:
http://localhost:3000

Frontend
1. Acesse a pasta
cd frontend
2. Instale as dependências
npm install
3. Inicie o projeto
npm run dev

Frontend rodando em:

http://localhost:5173 
Banco de Dados 
Migrations

Para gerar e aplicar migrations:

npx prisma migrate dev
Seed

Popula o banco com dados iniciais:

npx prisma db seed

O seed cria:

Produtos
Movimentações de estoque
API - Endpoints
Produtos
Criar produto
POST /products
Body:
{
  "name": "Notebook",
  "price": 3500
}
Listar produtos
GET /products
Response:
[
  {
    "id": "abc123",
    "name": "Notebook",
    "price": 3500,
    "stock": 8
  }
]
Estoque
Entrada de estoque
POST /stock/in
Body:
{
  "productId": "abc123",
  "quantity": 10
}
Saída de estoque
POST /stock/out
Body:
{
  "productId": "abc123",
  "quantity": 2
}
Regra de negócio
Não é permitido saída maior que o estoque disponível
Quantidade deve ser maior que zero
Response de sucesso
{
  "id": "mov123",
  "type": "OUT",
  "quantity": 2,
  "productId": "abc123",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
Response de erro
{
  "error": "Insufficient stock for this movement"
}
Regras de Negócio
Estoque é calculado com base nas movimentações
Entrada soma quantidade
Saída subtrai quantidade
Validação de estoque insuficiente no backend
Observações
Projeto focado em aprendizado de backend + integração
Estrutura preparada para evolução (auth, dashboard, etc.)
Código padronizado com ESLint + Prettier

Histórico de movimentações
Dashboard com gráficos
Autenticação de usuários
Deploy (backend + frontend)
Autor

Desenvolvido como projeto de estudo e portfólio.
