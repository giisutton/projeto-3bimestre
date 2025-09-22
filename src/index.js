// Importar as bibliotecas necessárias
import express from "express";
import dotenv from "dotenv";
import prisma from "./db.js"; // Importar nossa conexão com o banco

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Criar aplicação Express
const app = express();

// Middleware para processar JSON nas requisições
app.use(express.json());

//Healthcheck
app.get("/", (_req, res) => res.json({ ok: true, service: "API 3º Bimestre" }));

//ROTA DE TESTE
app.get("/status", (req, res) => {
  res.json({ message: "API Online" });
});

// ============ ROTAS CRUD PARA USUARIO ============

//CREATE: POST /usuarios
app.post("/usuarios", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const novoUsuario = await prisma.usuario.create({
      data: { name, email, password },
      include: { loja: true } // Include para trazer dados relacionados
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }

    res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
  }
});

//READ: GET /usuarios (listar todos)
app.get("/usuarios", async (_req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: { loja: true }, // Include para trazer dados relacionados
      orderBy: { id: "asc" }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuários", details: error.message });
  }
});

//READ: GET /usuarios/:id (buscar por ID)
app.get("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
      include: { loja: true } // Include para trazer dados relacionados
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário", details: error.message });
  }
});

//UPDATE: PUT /usuarios/:id
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { name, email, password },
      include: { loja: true } // Include para trazer dados relacionados
    });

    res.json(usuarioAtualizado);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
  }
});

//DELETE: DELETE /usuarios/:id
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(500).json({ error: "Erro ao deletar usuário", details: error.message });
  }
});

// ============ ROTAS CRUD PARA LOJA ============

//CREATE: POST /lojas
app.post("/lojas", async (req, res) => {
  try {
    const { nome, descricao, endereco, telefone, usuarioId } = req.body;
    const novaLoja = await prisma.loja.create({
      data: { nome, descricao, endereco, telefone, usuarioId },
      include: { 
        usuario: true, 
        produtos: true 
      } // Include para trazer dados relacionados
    });

    res.status(201).json(novaLoja);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Este usuário já possui uma loja" });
    }
    if (error.code === "P2003") {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    res.status(500).json({ error: "Erro ao criar loja", details: error.message });
  }
});

//READ: GET /lojas (listar todas)
app.get("/lojas", async (_req, res) => {
  try {
    const lojas = await prisma.loja.findMany({
      include: { 
        usuario: true, 
        produtos: true 
      }, // Include para trazer dados relacionados
      orderBy: { id: "asc" }
    });
    res.json(lojas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar lojas", details: error.message });
  }
});

//READ: GET /lojas/:id (buscar por ID)
app.get("/lojas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const loja = await prisma.loja.findUnique({
      where: { id: parseInt(id) },
      include: { 
        usuario: true, 
        produtos: true 
      } // Include para trazer dados relacionados
    });

    if (!loja) {
      return res.status(404).json({ error: "Loja não encontrada" });
    }

    res.json(loja);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar loja", details: error.message });
  }
});

//UPDATE: PUT /lojas/:id
app.put("/lojas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, endereco, telefone } = req.body;
    
    const lojaAtualizada = await prisma.loja.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, endereco, telefone },
      include: { 
        usuario: true, 
        produtos: true 
      } // Include para trazer dados relacionados
    });

    res.json(lojaAtualizada);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    res.status(500).json({ error: "Erro ao atualizar loja", details: error.message });
  }
});

//DELETE: DELETE /lojas/:id
app.delete("/lojas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.loja.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    res.status(500).json({ error: "Erro ao deletar loja", details: error.message });
  }
});

// ============ ROTAS CRUD PARA PRODUTO ============

//CREATE: POST /produtos
app.post("/produtos", async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, estoque, lojaId } = req.body;
    const novoProduto = await prisma.produto.create({
      data: { nome, descricao, preco, categoria, estoque, lojaId },
      include: { loja: true } // Include para trazer dados relacionados
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({ error: "Loja não encontrada" });
    }

    res.status(500).json({ error: "Erro ao criar produto", details: error.message });
  }
});

//READ: GET /produtos (listar todos)
app.get("/produtos", async (_req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: { loja: true }, // Include para trazer dados relacionados
      orderBy: { id: "asc" }
    });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos", details: error.message });
  }
});

//READ: GET /produtos/:id (buscar por ID)
app.get("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(id) },
      include: { loja: true } // Include para trazer dados relacionados
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto", details: error.message });
  }
});

//UPDATE: PUT /produtos/:id
app.put("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, categoria, estoque } = req.body;
    
    const produtoAtualizado = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, preco, categoria, estoque },
      include: { loja: true } // Include para trazer dados relacionados
    });

    res.json(produtoAtualizado);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar produto", details: error.message });
  }
});

//DELETE: DELETE /produtos/:id
app.delete("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.produto.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(500).json({ error: "Erro ao deletar produto", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
