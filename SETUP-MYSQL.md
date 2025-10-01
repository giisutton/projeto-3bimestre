# Configuração MySQL para o Projeto

## Requisitos da AV2 - Mini-Projeto

Este projeto deve usar **MySQL** conforme especificado na AV2.

### Opções para Configurar MySQL:

#### Opção 1: MySQL Local
1. Instalar MySQL Community Server
2. Criar banco de dados: `CREATE DATABASE marketplace_db;`
3. Configurar usuário e senha
4. Atualizar `.env` com a URL correta

#### Opção 2: MySQL com Docker
```bash
docker run --name mysql-marketplace -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=marketplace_db -p 3306:3306 -d mysql:8.0
```

#### Opção 3: Serviço MySQL Online
- MySQL no AlwaysData, PlanetScale, ou similar
- Configurar URL no `.env`

### URL de Conexão no .env:
```
DATABASE_URL="mysql://usuario:senha@localhost:3306/marketplace_db"
PORT=3000
```

### Comandos após configurar MySQL:
```bash
npx prisma migrate dev --name init
npx prisma generate
npm start
```

## Estrutura do Projeto Conforme AV2:

✅ **Models Prisma**: Usuario, Loja, Produto
✅ **Relacionamentos**: 1-1 (Usuario-Loja), 1-N (Loja-Produtos)  
✅ **CRUD Completo**: Todos os endpoints implementados
✅ **MySQL**: Schema configurado para MySQL
✅ **Express**: API REST funcional