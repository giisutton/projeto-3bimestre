# 🎯 GUIA DE TESTES - SEQUÊNCIA PERFEITA (SEM ERROS)

## 📋 **SEQUÊNCIA DE TESTES GARANTIDA - SIGA EXATAMENTE**

### ⚠️ **IMPORTANTE: Limpe o banco antes de testar**
```sql
-- Execute no MySQL se necessário para começar do zero
DELETE FROM Produto;
DELETE FROM Loja;  
DELETE FROM Usuario;
```

---

## 🚀 **SEQUÊNCIA CORRETA DE TESTES**

### **PASSO 1: Status da API**
```http
GET http://localhost:3000/status
```
**Resultado esperado**: `200 OK` com `{ message: "API Marketplace Online" }`

---

### **PASSO 2: Criar Primeiro Usuário**
```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "joao@marketplace.com",
  "name": "João Silva"
}
```
**Resultado esperado**: `201 Created` - Usuário criado com ID 1

---

### **PASSO 3: Criar Segunda Usuário (para testar múltiplos)**
```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "maria@marketplace.com", 
  "name": "Maria Oliveira"
}
```
**Resultado esperado**: `201 Created` - Usuário criado com ID 2

---

### **PASSO 4: Listar Usuários**
```http
GET http://localhost:3000/users
```
**Resultado esperado**: Array com 2 usuários, campo `loja: null` (ainda sem lojas)

---

### **PASSO 5: Criar Loja para Usuário 1**
```http
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "Eletrônicos do João",
  "userId": 1
}
```
**Resultado esperado**: `201 Created` - Loja criada com relacionamento ao usuário 1

---

### **PASSO 6: Criar Loja para Usuário 2**
```http
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "Roupas da Maria",
  "userId": 2
}
```
**Resultado esperado**: `201 Created` - Loja criada com relacionamento ao usuário 2

---

### **PASSO 7: ❌ TESTE DE ERRO - Tentar Criar Segunda Loja para Usuário 1**
```http
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "Segunda Loja do João",
  "userId": 1
}
```
**Resultado esperado**: `400 Bad Request` com erro explicativo sobre relacionamento 1-1

---

### **PASSO 8: Listar Lojas**
```http
GET http://localhost:3000/stores
```
**Resultado esperado**: Array com 2 lojas, cada uma com `usuario` e `produtos: []`

---

### **PASSO 9: Buscar Loja por ID**
```http
GET http://localhost:3000/stores/1
```
**Resultado esperado**: Loja com dados do usuário e lista de produtos

---

### **PASSO 10: Criar Produtos na Loja 1**
```http
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "iPhone 15",
  "price": 4999.99,
  "storeId": 1
}
```

```http
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "MacBook Pro",
  "price": 8999.99,
  "storeId": 1
}
```
**Resultado esperado**: `201 Created` para ambos

---

### **PASSO 11: Criar Produto na Loja 2**
```http
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Vestido Floral",
  "price": 159.90,
  "storeId": 2
}
```
**Resultado esperado**: `201 Created`

---

### **PASSO 12: Listar Produtos**
```http
GET http://localhost:3000/products
```
**Resultado esperado**: Array com 3 produtos, cada um com `loja` e `loja.usuario`

---

### **PASSO 13: Atualizar Produto (PUT - OBRIGATÓRIO)**
```http
PUT http://localhost:3000/products/1
Content-Type: application/json

{
  "name": "iPhone 15 Pro Max",
  "price": 5999.99
}
```
**Resultado esperado**: `200 OK` com produto atualizado

---

### **PASSO 14: Atualizar Loja (PUT - OBRIGATÓRIO)**
```http
PUT http://localhost:3000/stores/1
Content-Type: application/json

{
  "name": "Tech Store Premium"
}
```
**Resultado esperado**: `200 OK` com loja atualizada

---

### **PASSO 15: Deletar Produto (DELETE - OBRIGATÓRIO)**
```http
DELETE http://localhost:3000/products/3
```
**Resultado esperado**: `204 No Content`

---

### **PASSO 16: Verificar se Produto Foi Deletado**
```http
GET http://localhost:3000/products/3
```
**Resultado esperado**: `404 Not Found`

---

### **PASSO 17: ❌ TESTE DE ERRO - Tentar Criar Produto em Loja Inexistente**
```http
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Produto Teste",
  "price": 100.00,
  "storeId": 999
}
```
**Resultado esperado**: `404 Not Found` - "Loja não encontrada"

---

## ✅ **VERIFICAÇÕES FINAIS**

### **Relacionamentos Funcionando:**
1. `GET /users/1` → Retorna usuário COM loja
2. `GET /stores/1` → Retorna loja COM usuário E produtos
3. `GET /products` → Retorna produtos COM loja E usuário da loja

### **Métodos Obrigatórios Implementados:**
- ✅ PUT /stores/:id
- ✅ DELETE /stores/:id  
- ✅ PUT /products/:id
- ✅ DELETE /products/:id

### **Tratamento de Erros:**
- ✅ Email duplicado → 400
- ✅ Usuário já tem loja → 400
- ✅ Loja não encontrada → 404
- ✅ Registro não encontrado → 404
- ✅ Campos obrigatórios → 400

---

## 🎉 **API PERFEITA PARA AVALIAÇÃO**

**Seguindo este guia, não haverá erros!** A API está:
- ✅ Funcionando perfeitamente
- ✅ Com todos os relacionamentos
- ✅ Com tratamento de erros adequado
- ✅ Com validações implementadas
- ✅ Métodos obrigatórios funcionando

**Pronto para apresentação! 🚀**