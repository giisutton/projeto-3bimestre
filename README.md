# API Marketplace Enxuto - Projeto 3º Bimestre

## 📋 Descrição
API REST desenvolvida com Node.js, Express, Prisma e MySQL contendo:
- **3 tabelas** no banco de dados: Usuario, Loja, Produto
- **Relacionamento 1-1**: Usuario ↔ Loja (cada usuário tem uma loja)
- **Relacionamento 1-N**: Loja ↔ Produto (uma loja pode ter vários produtos)
- **CRUD completo** para todas as tabelas
- **Include do Prisma** para trazer dados relacionados
- **Métodos obrigatórios**: PUT e DELETE para Stores e Products

## 🚀 Como executar

### 1. Instalação
```bash
cd projeto-3bimestre
npm install
```

### 2. Iniciar Servidor
```bash
npm run dev  # Modo desenvolvimento com nodemon
npm start    # Modo produção
```

A API estará disponível em: `http://localhost:3000`

## 📚 Rotas da API

### **Usuários (Users)**
- `POST /users` - Criar usuário
- `GET /users` - Listar usuários (com loja)
- `GET /users/:id` - Buscar usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### **Lojas (Stores)** 
- `POST /stores` - Criar loja (relacionamento 1-1 com usuário)
- `GET /stores` - Listar lojas (com usuário e produtos)
- `GET /stores/:id` - Buscar loja por ID
- `PUT /stores/:id` - **Atualizar loja (OBRIGATÓRIO)**
- `DELETE /stores/:id` - **Deletar loja (OBRIGATÓRIO)**

### **Produtos (Products)**
- `POST /products` - Criar produto (relacionamento N-1 com loja)
- `GET /products` - Listar produtos (com loja e usuário)
- `GET /products/:id` - Buscar produto por ID
- `PUT /products/:id` - **Atualizar produto (OBRIGATÓRIO)**
- `DELETE /products/:id` - **Deletar produto (OBRIGATÓRIO)**

### **Status**
- `GET /status` - Status da API
- `GET /` - Health check

## 📝 Exemplos de Uso

### Criar Usuário
```json
POST /users
{
  "email": "joao@marketplace.com",
  "name": "João Silva"
}
```

### Criar Loja (requer usuário existente)
```json
POST /stores
{
  "name": "Eletrônicos do João",
  "userId": 1
}
```

### Criar Produto (requer loja existente)
```json
POST /products
{
  "name": "iPhone 15",
  "price": 4999.99,
  "storeId": 1
}
```

## 🎯 Para Testar
1. **Importe a collection**: `insomnia-collection.json`
2. **Siga o guia**: `GUIA-TESTES-PERFEITO.md`
3. **Ou use**: `marketplace-testes.md` para exemplos

## 🗂️ Estrutura do Projeto
```
projeto-3bimestre/
├── prisma/
│   ├── schema.prisma          # Schema do banco
│   └── migrations/            # Migrações
├── src/
│   ├── db.js                  # Conexão Prisma
│   └── index.js               # Rotas da API
├── insomnia-collection.json   # Collection para testes
├── marketplace-testes.md      # Documentação de testes
├── GUIA-TESTES-PERFEITO.md   # Guia de testes detalhado
├── .env                       # Configuração do banco
└── package.json               # Dependências
```

## ✅ Funcionalidades
- ✅ **3 tabelas**: Usuario, Loja, Produto
- ✅ **Relacionamento 1-1**: Usuario ↔ Loja
- ✅ **Relacionamento 1-N**: Loja ↔ Produtos
- ✅ **CRUD completo** para todas as tabelas
- ✅ **Include do Prisma** em todas as consultas
- ✅ **PUT/DELETE obrigatórios** para Stores e Products
- ✅ **Tratamento de erros** e validações
- ✅ **API totalmente funcional**

## �️ Tecnologias
- Node.js + Express + Prisma + MySQL + AlwaysData

**🎉 Projeto pronto para avaliação!**