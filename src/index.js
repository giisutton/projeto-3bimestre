// Importar as bibliotecas necessárias
import express from "express";
import dotenv from "dotenv";
import prisma from "./db.js"; // Importar nossa conexão com o banco

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Verificar se o Prisma foi importado corretamente
if (!prisma) {
  console.error("❌ ERRO CRÍTICO: Prisma Client não foi importado!");
  process.exit(1);
}

console.log("🔧 Prisma Client importado:", typeof prisma);
console.log("🔧 Métodos disponíveis:", Object.keys(prisma));

// Criar aplicação Express
const app = express();

// Middleware para processar JSON nas requisições
app.use(express.json());

//Healthcheck
app.get("/", (_req, res) => res.json({ ok: true, service: "API Marketplace Enxuto" }));

//ROTA DE TESTE
app.get("/status", (req, res) => {
  res.json({ message: "API Marketplace Online" });
});

// ============ ROTAS CRUD PARA USUÁRIOS ============

// POST /users - Criar usuário
app.post('/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.usuario.create({
      data: { email, name },
      include: { loja: true }
    });
    res.status(201).json(user);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// GET /users - Listar todos os usuários (com include da store)
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.usuario.findMany({
      include: { loja: true }
    });
    res.json(users);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// GET /users/:id - Buscar usuário por ID (com include da store)
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id: Number(req.params.id) },
      include: { loja: true }
    });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// PUT /users/:id - Atualizar usuário
app.put('/users/:id', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.usuario.update({
      where: { id: Number(req.params.id) },
      data: { email, name },
      include: { loja: true }
    });
    res.json(user);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// DELETE /users/:id - Deletar usuário
app.delete('/users/:id', async (req, res) => {
  try {
    await prisma.usuario.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// ============ ROTAS CRUD PARA STORES (LOJAS) ============

// POST /stores - Criar loja (relacionamento 1-1 com User)
app.post('/stores', async (req, res) => {
  try {
    const { name, userId } = req.body;
    const store = await prisma.loja.create({
      data: { name, usuarioId: Number(userId) },
      include: { usuario: true, produtos: true }
    });
    res.status(201).json(store);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// GET /stores - Listar todas as lojas (com include de user e products)
app.get('/stores', async (req, res) => {
  try {
    const stores = await prisma.loja.findMany({
      include: { usuario: true, produtos: true }
    });
    res.json(stores);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// GET /stores/:id - Buscar loja por ID (retorna loja + user (dono) + produtos)
app.get('/stores/:id', async (req, res) => {
  try {
    const store = await prisma.loja.findUnique({
      where: { id: Number(req.params.id) },
      include: { usuario: true, produtos: true }
    });
    if (!store) return res.status(404).json({ error: 'Loja não encontrada' });
    res.json(store);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// PUT /stores/:id - Atualizar loja (OBRIGATÓRIO)
app.put('/stores/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const store = await prisma.loja.update({
      where: { id: Number(req.params.id) },
      data: { name },
      include: { usuario: true, produtos: true }
    });
    res.json(store);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// DELETE /stores/:id - Deletar loja (OBRIGATÓRIO)
app.delete('/stores/:id', async (req, res) => {
  try {
    await prisma.loja.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// ============ ROTAS CRUD PARA PRODUCTS (PRODUTOS) ============

// POST /products - Criar produto (relacionamento N-1 com Store)
app.post('/products', async (req, res) => {
  try {
    const { name, price, storeId } = req.body;
    const product = await prisma.produto.create({
      data: { name, price: Number(price), lojaId: Number(storeId) },
      include: { loja: { include: { usuario: true } } }
    });
    res.status(201).json(product);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// GET /products - Listar todos os produtos (inclui a loja e o dono da loja)
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.produto.findMany({
      include: { loja: { include: { usuario: true } } }
    });
    res.json(products);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// GET /products/:id - Buscar produto por ID (com include da store e user)
app.get('/products/:id', async (req, res) => {
  try {
    const product = await prisma.produto.findUnique({
      where: { id: Number(req.params.id) },
      include: { loja: { include: { usuario: true } } }
    });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// PUT /products/:id - Atualizar produto (OBRIGATÓRIO)
app.put('/products/:id', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.produto.update({
      where: { id: Number(req.params.id) },
      data: { name, price: Number(price) },
      include: { loja: { include: { usuario: true } } }
    });
    res.json(product);
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// DELETE /products/:id - Deletar produto (OBRIGATÓRIO)
app.delete('/products/:id', async (req, res) => {
  try {
    await prisma.produto.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// ============ IMPORTANTE: MÉTODOS OBRIGATÓRIOS ============
// ✅ PUT (atualização) para Stores - IMPLEMENTADO
// ✅ DELETE (remoção) para Stores - IMPLEMENTADO  
// ✅ PUT (atualização) para Products - IMPLEMENTADO
// ✅ DELETE (remoção) para Products - IMPLEMENTADO

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Marketplace rodando em http://localhost:${PORT}`);
});