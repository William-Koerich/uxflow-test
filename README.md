Claro! Aqui está o texto formatado para um arquivo README.md:

markdown
Copy code
# uxflow-test

Este projeto é uma aplicação Node.js com Prisma e TypeScript que implementa um sistema de gerenciamento de produtos, categorias e carrinho de compras, incluindo autenticação e autorização via JWT.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (ou uma instância de banco de dados compatível, como o Supabase)

## Configuração

### 1. Clonar o repositório

```bash
  git clone https://github.com/William-Koerich/uxflow-test.git
  cd uxflow-test
```
### 2. Instalar as dependências
    
```bash
    npm install
```

### 3. Configurar as variáveis de ambiente
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo, substituindo os valores conforme necessário:
```text
    DATABASE_URL="postgresql://seu-usuario:sua-senha@seu-host:seu-porta/seu-database"
    JWT_SECRET="sua_chave_secreta"
    PORT=3000
```
### 4. Configurar o Prisma
 1. Gere o cliente Prisma:
    ```bash
      npx prisma generate
    ```
 2. Rode as migrações para configurar o banco de dados:
    ```bash
      npx prisma migrate dev --name init
    ```
#### 5. Rodar a aplicação
```bash
    npm start
```
A aplicação estará rodando em http://localhost:3000.

### Estrutura do Projeto
```plaintext
/uxflow-test
  /node_modules
  /prisma
    schema.prisma
  /src
    /middleware
      auth.ts
    /routes
      auth.ts
      products.ts
      categories.ts
      cart.ts
    app.ts
  .env
  package.json
  tsconfig.json
  README.md
  ```
#### Endpoints

```plaintext
Autenticação
POST /auth/register: Registrar um novo usuário
POST /auth/login: Autenticar um usuário e obter um token JWT
Produtos
POST /products: Criar um novo produto (requer autenticação)
GET /products: Listar todos os produtos com filtros por categoria e faixa de preço (requer autenticação)
GET /products/:id: Obter os detalhes de um produto específico (requer autenticação)
PUT /products/:id: Atualizar informações de um produto (requer autenticação)
DELETE /products/:id: Excluir um produto (requer autenticação)
Categorias
POST /categories: Criar uma nova categoria (requer autenticação)
GET /categories: Listar todas as categorias (requer autenticação)
GET /categories/:id: Obter os detalhes de uma categoria específica (requer autenticação)
PUT /categories/:id: Atualizar informações de uma categoria (requer autenticação)
DELETE /categories/:id: Excluir uma categoria (requer autenticação)
Carrinho de Compras
POST /cart/add: Adicionar produtos ao carrinho de compras (requer autenticação)
POST /cart/remove: Remover produtos do carrinho de compras (requer autenticação)
GET /cart: Visualizar os produtos no carrinho de compras (requer autenticação)
POST /cart/checkout: Finalizar a compra dos produtos no carrinho (requer autenticação)
```

### Tecnologias Utilizadas
Node.js
TypeScript
Express
Prisma
PostgreSQL
JWT
Bcryptjs
