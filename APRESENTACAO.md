# 📋 INSTRUÇÕES PARA APRESENTAÇÃO - Projeto 3º Bimestre

## ✅ ATIVIDADE COMPLETAMENTE IMPLEMENTADA

### 🎯 Funcionalidades Obrigatórias Atendidas:

#### ✅ 1. **3 Tabelas com Relacionamentos**
- **Usuario**: id, name, email, password, createdAt
- **Loja**: id, nome, descricao, endereco, telefone, usuarioId, createdAt  
- **Produto**: id, nome, descricao, preco, categoria, estoque, lojaId, createdAt

#### ✅ 2. **Relacionamento 1-1**
- **Usuario ↔ Loja**: Cada usuário pode ter apenas uma loja
- Implementado com `usuarioId UNIQUE` na tabela Loja

#### ✅ 3. **Relacionamento 1-N** 
- **Loja ↔ Produto**: Uma loja pode ter vários produtos
- Implementado com `lojaId` na tabela Produto

#### ✅ 4. **CRUD Completo para TODAS as Tabelas**
- **GET** (listar todos e buscar por ID)
- **POST** (criar)
- **PUT** (atualizar)
- **DELETE** (deletar)

#### ✅ 5. **Include do Prisma**
- Todas as consultas trazem dados relacionados
- Usuario inclui sua Loja
- Loja inclui Usuario e Produtos
- Produto inclui sua Loja

#### ✅ 6. **Organização do Projeto**
- Separação de arquivos (db.js, index.js)
- Uso correto do Prisma Client
- Tratamento de erros
- Validações adequadas

---

## 🚀 COMO EXECUTAR PARA A APRESENTAÇÃO

### 1. **Configurar MySQL** (Professor/Avaliador)
```sql
-- No MySQL Workbench ou terminal:
CREATE DATABASE projeto_3bimestre;
```

### 2. **Configurar Variáveis de Ambiente**
- Arquivo `.env` já configurado
- Ajustar usuário/senha MySQL se necessário

### 3. **Executar Migrações**
```bash
npx prisma migrate dev
npx prisma generate
```

### 4. **Iniciar Servidor**
```bash
npm run dev
```

### 5. **Testar no Insomnia**
- Use o arquivo `exemplos-teste.md` com todas as requisições prontas
- Servidor rodará em `http://localhost:3000`

---

## 📝 EXPLICAÇÃO PARA APRESENTAÇÃO

### **Parte 1: Estrutura do Banco**
```javascript
// Mostrar schema.prisma explicando:
// - 3 tabelas
// - Relacionamento 1-1 (Usuario-Loja)  
// - Relacionamento 1-N (Loja-Produtos)
// - Constraints e validações
```

### **Parte 2: CRUD Completo**
```javascript
// Demonstrar no código (index.js):
// - GET /usuarios (com include: { loja: true })
// - POST /usuarios  
// - PUT /usuarios/:id
// - DELETE /usuarios/:id
// 
// Mesmo padrão para Loja e Produto
```

### **Parte 3: Relacionamentos e Includes**
```javascript
// Explicar como funciona:
app.get("/usuarios", async (_req, res) => {
  const usuarios = await prisma.usuario.findMany({
    include: { loja: true }, // ← INCLUDE trazendo dados relacionados
    orderBy: { id: "asc" }
  });
  res.json(usuarios);
});
```

### **Parte 4: Teste Prático**
1. **Criar Usuário**: POST /usuarios
2. **Criar Loja para o Usuário**: POST /lojas  
3. **Criar Produtos para a Loja**: POST /produtos
4. **Consultar com Relacionamentos**: GET /usuarios (mostra loja), GET /lojas (mostra usuario e produtos)

---

## 📊 PONTOS PRINCIPAIS PARA DESTACAR

### ✅ **Atendimento Completo dos Requisitos**
- 3 tabelas ✓
- Relacionamento 1-1 ✓  
- Relacionamento 1-N ✓
- CRUD completo ✓
- Include funcionando ✓

### ✅ **Qualidade do Código**
- Tratamento de erros (P2002, P2025, P2003)
- Validações de dados
- Estrutura organizada
- Comentários explicativos

### ✅ **Funcionalidade Testável**
- API totalmente funcional
- Exemplos de teste fornecidos
- Documentação completa
- Instruções claras

---

## 🔍 PRINCIPAIS ARQUIVOS PARA MOSTRAR

1. **`prisma/schema.prisma`** - Estrutura do banco e relacionamentos
2. **`src/index.js`** - Todas as rotas CRUD com includes
3. **`exemplos-teste.md`** - Demonstração prática funcionando
4. **`README.md`** - Documentação completa

---

## 💡 DICAS PARA APRESENTAÇÃO

1. **Comece mostrando o schema** - explique os relacionamentos
2. **Demonstre o CRUD** - mostre algumas rotas principais  
3. **Execute testes no Insomnia** - prove que funciona
4. **Destaque os includes** - mostre dados relacionados sendo retornados
5. **Explique a organização** - estrutura de arquivos e boas práticas

**O projeto está 100% funcional e atende todos os requisitos da atividade!** 🎉