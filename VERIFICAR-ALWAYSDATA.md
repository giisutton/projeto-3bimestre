# 🔧 COMO ENCONTRAR AS CREDENCIAIS CORRETAS NO ALWAYSDATA

## 📋 **PASSO A PASSO PARA VERIFICAR:**

### 1. **Acesse o Painel AlwaysData:**
- Login em: https://admin.alwaysdata.com/
- Use suas credenciais de conta

### 2. **Navegue até o MySQL:**
- No menu lateral: **"Databases"** → **"MySQL"**
- Ou procure por "MySQL" no menu

### 3. **Verifique as Informações:**
Anote EXATAMENTE como aparece:

**Nome do Usuário:**
- Pode ser: `gi170807`, `giovana`, `gi170807_giovana`, ou outro
- **COPIE EXATAMENTE** como está escrito

**Nome do Banco:**
- Pode ser: `giovana_gigi`, `gi170807_giovana`, ou outro
- **COPIE EXATAMENTE** como está escrito

**Host/Servidor:**
- Geralmente: `mysql-giovana.alwaysdata.net`
- Ou pode ter outro formato

### 4. **Senha:**
- Se não lembra, pode resetar no painel
- Vá em "Actions" → "Change password"

### 5. **Formato da URL Correta:**
```
DATABASE_URL="mysql://USUARIO:SENHA@HOST:3306/NOME_DO_BANCO"
```

## 🎯 **EXEMPLO DE VERIFICAÇÃO:**

Se no painel aparecer:
- **Usuário**: `gi170807_giovana`
- **Banco**: `gi170807_marketplace`  
- **Host**: `mysql-giovana.alwaysdata.net`
- **Senha**: `minhasenha123`

Então a URL seria:
```env
DATABASE_URL="mysql://gi170807_giovana:minhasenha123@mysql-giovana.alwaysdata.net:3306/gi170807_marketplace"
```

## 🚨 **PONTOS IMPORTANTES:**
1. **Case sensitive**: Maiúsculas/minúsculas importam
2. **Sem espaços**: Não pode ter espaços nos nomes
3. **Caracteres especiais**: Na senha, use %40 para @ e %23 para #
4. **Porta**: Sempre use `:3306` no final do host

## ✅ **DEPOIS DE VERIFICAR:**
1. Atualize o arquivo `.env` com os dados corretos
2. Execute: `npx prisma db pull` (para testar conexão)
3. Se funcionar: `npx prisma migrate dev`

---

**🔍 Verifique no painel e me informe os dados corretos para eu ajustar!**