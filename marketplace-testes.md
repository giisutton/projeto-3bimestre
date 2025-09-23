# 📋 Exemplos de Teste - API Marketplace Enxuto

## 🎯 **MÉTODOS OBRIGATÓRIOS IMPLEMENTADOS:**
✅ **PUT (atualização) para Stores**  
✅ **DELETE (remoção) para Stores**  
✅ **PUT (atualização) para Products**  
✅ **DELETE (remoção) para Products**

---

## 🚀 **Servidor rodando em:** `http://localhost:3000`

---

## 👥 **USUÁRIOS (Users)**

### 1. Criar Usuário
**POST** `http://localhost:3000/users`
```json
{
  "email": "joao@marketplace.com",
  "name": "João Silva"
}
```

### 2. Listar Usuários (com include da store)
**GET** `http://localhost:3000/users`

### 3. Buscar Usuário por ID
**GET** `http://localhost:3000/users/1`

### 4. Atualizar Usuário
**PUT** `http://localhost:3000/users/1`
```json
{
  "email": "joao.silva@marketplace.com",
  "name": "João Silva Santos"
}
```

### 5. Deletar Usuário
**DELETE** `http://localhost:3000/users/1`

---

## 🏪 **LOJAS (Stores) - Relacionamento 1-1 com User**

### 6. Criar Loja (após criar usuário)
**POST** `http://localhost:3000/stores`
```json
{
  "name": "Eletrônicos do João",
  "userId": 1
}
```

### 7. Listar Lojas (com include de user e products)
**GET** `http://localhost:3000/stores`

### 8. Buscar Loja por ID (retorna loja + user + produtos)
**GET** `http://localhost:3000/stores/1`

### 9. **Atualizar Loja (OBRIGATÓRIO)**
**PUT** `http://localhost:3000/stores/1`
```json
{
  "name": "Tech Store Premium"
}
```

### 10. **Deletar Loja (OBRIGATÓRIO)**
**DELETE** `http://localhost:3000/stores/1`

---

## 📦 **PRODUTOS (Products) - Relacionamento N-1 com Store**

### 11. Criar Produto (após criar loja)
**POST** `http://localhost:3000/products`
```json
{
  "name": "iPhone 15",
  "price": 4999.99,
  "storeId": 1
}
```

### 12. Criar mais produtos
**POST** `http://localhost:3000/products`
```json
{
  "name": "MacBook Pro",
  "price": 8999.99,
  "storeId": 1
}
```

**POST** `http://localhost:3000/products`
```json
{
  "name": "AirPods Pro",
  "price": 1299.99,
  "storeId": 1
}
```

### 13. Listar Produtos (inclui loja e dono da loja)
**GET** `http://localhost:3000/products`

### 14. Buscar Produto por ID
**GET** `http://localhost:3000/products/1`

### 15. **Atualizar Produto (OBRIGATÓRIO)**
**PUT** `http://localhost:3000/products/1`
```json
{
  "name": "iPhone 15 Pro Max",
  "price": 5999.99
}
```

### 16. **Deletar Produto (OBRIGATÓRIO)**
**DELETE** `http://localhost:3000/products/1`

---

## 🧪 **SEQUÊNCIA DE TESTE COMPLETA**

### Passo 1: Criar Usuário
```json
POST /users
{
  "email": "maria@marketplace.com",
  "name": "Maria Oliveira"
}
```

### Passo 2: Criar Loja para o Usuário
```json
POST /stores
{
  "name": "Roupas da Maria",
  "userId": 1
}
```

### Passo 3: Criar Produtos para a Loja
```json
POST /products
{
  "name": "Vestido Floral",
  "price": 159.90,
  "storeId": 1
}

POST /products
{
  "name": "Blusa Social",
  "price": 89.90,
  "storeId": 1
}
```

### Passo 4: Testar Includes (Relacionamentos)
- **GET /users/1** → Retorna usuário com sua loja
- **GET /stores/1** → Retorna loja com usuário e produtos
- **GET /products** → Retorna produtos com loja e dono

### Passo 5: Testar Métodos Obrigatórios
- **PUT /stores/1** → Atualizar nome da loja
- **PUT /products/1** → Atualizar produto
- **DELETE /products/2** → Deletar produto
- **DELETE /stores/1** → Deletar loja (cascade products)

---

## 🎯 **Verificações dos Requisitos**

### ✅ **3 Tabelas**
- User, Store, Product

### ✅ **Relacionamento 1-1**
- User ↔ Store (um usuário tem uma loja)

### ✅ **Relacionamento 1-N**
- Store ↔ Product (uma loja tem vários produtos)

### ✅ **CRUD Completo**
- GET, POST, PUT, DELETE para todas as tabelas

### ✅ **Include do Prisma**
- Todas as consultas trazem dados relacionados

### ✅ **Métodos Obrigatórios**
- ✅ PUT para Stores
- ✅ DELETE para Stores
- ✅ PUT para Products
- ✅ DELETE para Products

---

## 🔧 **URLs de Teste Rápido**

- **Status**: `GET http://localhost:3000/status`
- **Health**: `GET http://localhost:3000/`
- **Usuários**: `GET http://localhost:3000/users`
- **Lojas**: `GET http://localhost:3000/stores`
- **Produtos**: `GET http://localhost:3000/products`

**Marketplace pronto para apresentação! 🎉**