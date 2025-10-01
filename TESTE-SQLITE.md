# 🚀 TESTE IMEDIATO COM SQLITE

## Para testar a API imediatamente enquanto resolve o MySQL:

### 1. **Backup do schema atual:**
```bash
copy prisma\schema.prisma prisma\schema-mysql.prisma
```

### 2. **Usar schema SQLite:**
```bash
copy schema-sqlite.prisma prisma\schema.prisma
```

### 3. **Limpar migrações antigas:**
```bash
Remove-Item -Recurse -Force prisma\migrations
```

### 4. **Criar migração SQLite:**
```bash
npx prisma migrate dev --name init_sqlite
```

### 5. **Iniciar servidor:**
```bash
npm start
```

### 6. **Testar API:**
```bash
# Status
Invoke-RestMethod -Uri "http://localhost:3000/status" -Method GET

# Criar usuário
$body = @{
    email = "teste@exemplo.com"
    name = "Usuário Teste"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST -Body $body -ContentType "application/json"
```

## ⚡ **Comandos Rápidos PowerShell:**

```powershell
# Backup e troca para SQLite
copy prisma\schema.prisma prisma\schema-mysql.prisma
copy schema-sqlite.prisma prisma\schema.prisma
Remove-Item -Recurse -Force prisma\migrations -ErrorAction SilentlyContinue
npx prisma migrate dev --name init_sqlite
npm start
```

## 🔄 **Para voltar ao MySQL depois:**
```powershell
copy prisma\schema-mysql.prisma prisma\schema.prisma
Remove-Item -Recurse -Force prisma\migrations
# (configurar credenciais corretas no .env)
npx prisma migrate dev --name init_mysql
```