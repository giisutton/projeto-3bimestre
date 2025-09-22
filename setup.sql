-- Script SQL para configuração do banco de dados
-- Execute este script no MySQL para criar o banco

-- 1. Criar o banco de dados
CREATE DATABASE IF NOT EXISTS projeto_3bimestre;

-- 2. Usar o banco criado
USE projeto_3bimestre;

-- 3. Verificar se o banco foi criado
SHOW DATABASES;

-- 4. Após executar este script, rode os comandos do Prisma:
-- npx prisma migrate dev
-- npx prisma generate

-- Estrutura das tabelas que serão criadas pelo Prisma:
/*

Table: Usuario
- id (PK, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- createdAt (DATETIME)

Table: Loja  
- id (PK, AUTO_INCREMENT)
- nome (VARCHAR)
- descricao (VARCHAR, NULLABLE)
- endereco (VARCHAR)
- telefone (VARCHAR, NULLABLE)
- usuarioId (FK -> Usuario.id, UNIQUE) -- Relacionamento 1-1
- createdAt (DATETIME)

Table: Produto
- id (PK, AUTO_INCREMENT)
- nome (VARCHAR)
- descricao (VARCHAR, NULLABLE)
- preco (DECIMAL(10,2))
- categoria (VARCHAR)
- estoque (INT, DEFAULT 0)
- lojaId (FK -> Loja.id) -- Relacionamento 1-N
- createdAt (DATETIME)

Relacionamentos:
- Usuario 1-1 Loja (cada usuário pode ter uma loja)
- Loja 1-N Produto (uma loja pode ter vários produtos)

*/