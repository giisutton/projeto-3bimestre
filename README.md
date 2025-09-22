# Projeto 3º Bimestre - API REST com Node.js, Prisma e MySQL

## 📋 Descrição
API REST desenvolvida com Node.js, Express, Prisma e MySQL contendo:
- **3 tabelas** no banco de dados: Usuario, Loja, Produto
- **Relacionamento 1-1**: Usuario ↔ Loja (cada usuário pode ter uma loja)
- **Relacionamento 1-N**: Loja ↔ Produto (uma loja pode ter vários produtos)
- **CRUD completo** para todas as tabelas
- **Include do Prisma** para trazer dados relacionados

## 🚀 Como executar

### 1. Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando na porta 3306
- Git (opcional)

### 2. Instalação
```bash
# Clone ou baixe o projeto
cd projeto-3bimestre

# Instale as dependências
npm install
```

### 3. Configuração do Banco de Dados (AlwaysData)
Este projeto está configurado para usar o AlwaysData como provedor MySQL.

**Configuração já feita:**
- Host: `mysql-giovana.alwaysdata.net`
- Banco: `giovana_gigi` 
- Usuário: `giovana`

O arquivo `.env` já está configurado com as credenciais corretas.

### 4. Configuração das Variáveis de Ambiente
O arquivo `.env` já está configurado com as credenciais do AlwaysData:
```
DATABASE_URL="mysql://giovana:gi170807@mysql-giovana.alwaysdata.net:3306/giovana_gigi"
PORT=3000
```

### 5. Criar Tabelas no Banco
```bash
# Aplicar as tabelas no banco (já executado)
npx prisma db push

# Gerar o cliente Prisma (já executado)
npx prisma generate
```

### 6. Iniciar o Servidor
```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

A API estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

### 🔗 Rotas Disponíveis

#### **Usuários**
- `GET /usuarios` - Listar todos os usuários (com includes)
- `GET /usuarios/:id` - Buscar usuário por ID (com includes)
- `POST /usuarios` - Criar novo usuário
- `PUT /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Deletar usuário

#### **Lojas**
- `GET /lojas` - Listar todas as lojas (com includes)
- `GET /lojas/:id` - Buscar loja por ID (com includes)
- `POST /lojas` - Criar nova loja
- `PUT /lojas/:id` - Atualizar loja
- `DELETE /lojas/:id` - Deletar loja

#### **Produtos**
- `GET /produtos` - Listar todos os produtos (com includes)
- `GET /produtos/:id` - Buscar produto por ID (com includes)
- `POST /produtos` - Criar novo produto
- `PUT /produtos/:id` - Atualizar produto
- `DELETE /produtos/:id` - Deletar produto

### 📝 Exemplos de Uso (JSON)

#### Criar Usuário
```json
POST /usuarios
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Criar Loja (requer usuário existente)
```json
POST /lojas
{
  "nome": "Loja do João",
  "descricao": "Loja de eletrônicos",
  "endereco": "Rua das Flores, 123",
  "telefone": "(11) 99999-9999",
  "usuarioId": 1
}
```

#### Criar Produto (requer loja existente)
```json
POST /produtos
{
  "nome": "Smartphone",
  "descricao": "Smartphone Android",
  "preco": 899.99,
  "categoria": "Eletrônicos",
  "estoque": 10,
  "lojaId": 1
}
```

## 🗂️ Estrutura do Projeto
```
projeto-3bimestre/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Migrações do banco
├── src/
│   ├── db.js                  # Conexão com o banco
│   └── index.js               # Arquivo principal com todas as rotas
├── .env                       # Variáveis de ambiente
├── .env.example              # Exemplo de variáveis
├── package.json              # Dependências e scripts
└── README.md                 # Este arquivo
```

## 🎯 Funcionalidades Implementadas
✅ 3 tabelas com relacionamentos (Usuario, Loja, Produto)  
✅ Relacionamento 1-1 (Usuario ↔ Loja)  
✅ Relacionamento 1-N (Loja ↔ Produtos)  
✅ CRUD completo para todas as tabelas  
✅ Include do Prisma em todas as consultas  
✅ Tratamento de erros  
✅ Validações de dados  
✅ Organização básica do projeto  

## 🛠️ Tecnologias Utilizadas
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **MySQL** - Banco de dados relacional
- **dotenv** - Gerenciamento de variáveis de ambiente
- **nodemon** - Reinicialização automática em desenvolvimento

## 📋 Para Teste no Insomnia
1. Importe as rotas ou configure manualmente
2. Teste a criação de usuário primeiro
3. Em seguida, crie uma loja para o usuário
4. Por fim, adicione produtos à loja
5. Teste as consultas GET para ver os includes funcionando