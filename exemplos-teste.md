# Exemplos de Requisições para Teste no Insomnia/Postman

## 1. Criar Usuário
**POST** `http://localhost:3000/usuarios`
```json
{
  "name": "João Silva",
  "email": "joao@email.com", 
  "password": "123456"
}
```

## 2. Listar Usuários (com include da loja)
**GET** `http://localhost:3000/usuarios`

## 3. Buscar Usuário por ID (com include da loja)
**GET** `http://localhost:3000/usuarios/1`

## 4. Criar Loja (relacionamento 1-1 com usuário)
**POST** `http://localhost:3000/lojas`
```json
{
  "nome": "Eletrônicos do João",
  "descricao": "Loja especializada em eletrônicos e gadgets",
  "endereco": "Rua das Flores, 123, Centro",
  "telefone": "(11) 99999-9999",
  "usuarioId": 1
}
```

## 5. Listar Lojas (com include do usuário e produtos)
**GET** `http://localhost:3000/lojas`

## 6. Buscar Loja por ID (com includes)
**GET** `http://localhost:3000/lojas/1`

## 7. Criar Produtos (relacionamento N-1 com loja)
**POST** `http://localhost:3000/produtos`
```json
{
  "nome": "Smartphone Samsung Galaxy",
  "descricao": "Smartphone Android com 128GB de memória",
  "preco": 899.99,
  "categoria": "Eletrônicos",
  "estoque": 15,
  "lojaId": 1
}
```

**POST** `http://localhost:3000/produtos`
```json
{
  "nome": "Fone de Ouvido Bluetooth",
  "descricao": "Fone sem fio com cancelamento de ruído",
  "preco": 199.90,
  "categoria": "Acessórios",
  "estoque": 25,
  "lojaId": 1
}
```

**POST** `http://localhost:3000/produtos`
```json
{
  "nome": "Carregador Portátil",
  "descricao": "Power bank 10000mAh",
  "preco": 89.99,
  "categoria": "Acessórios",
  "estoque": 30,
  "lojaId": 1
}
```

## 8. Listar Produtos (com include da loja)
**GET** `http://localhost:3000/produtos`

## 9. Buscar Produto por ID (com include da loja)
**GET** `http://localhost:3000/produtos/1`

## 10. Atualizar Usuário
**PUT** `http://localhost:3000/usuarios/1`
```json
{
  "name": "João Silva Santos",
  "email": "joao.santos@email.com",
  "password": "novaSenha123"
}
```

## 11. Atualizar Loja
**PUT** `http://localhost:3000/lojas/1`
```json
{
  "nome": "Tech Store do João",
  "descricao": "Loja completa de tecnologia e eletrônicos",
  "endereco": "Rua das Flores, 123, Centro - São Paulo/SP",
  "telefone": "(11) 98888-8888"
}
```

## 12. Atualizar Produto
**PUT** `http://localhost:3000/produtos/1`
```json
{
  "nome": "Smartphone Samsung Galaxy S23",
  "descricao": "Smartphone Android com 256GB de memória",
  "preco": 999.99,
  "categoria": "Smartphones",
  "estoque": 12
}
```

## 13. Deletar Produto
**DELETE** `http://localhost:3000/produtos/3`

## 14. Deletar Loja (irá deletar produtos em cascata)
**DELETE** `http://localhost:3000/lojas/1`

## 15. Deletar Usuário (irá deletar loja e produtos em cascata)
**DELETE** `http://localhost:3000/usuarios/1`

## Teste de Relacionamentos

### Criar segundo usuário e loja para testar
**POST** `http://localhost:3000/usuarios`
```json
{
  "name": "Maria Oliveira",
  "email": "maria@email.com",
  "password": "123456"
}
```

**POST** `http://localhost:3000/lojas`
```json
{
  "nome": "Roupas da Maria",
  "descricao": "Loja de roupas femininas",
  "endereco": "Av. Principal, 456",
  "telefone": "(11) 77777-7777",
  "usuarioId": 2
}
```

**POST** `http://localhost:3000/produtos`
```json
{
  "nome": "Vestido Floral",
  "descricao": "Vestido estampado tamanho M",
  "preco": 89.90,
  "categoria": "Roupas",
  "estoque": 5,
  "lojaId": 2
}
```

## Verificações Importantes
1. ✅ **Relacionamento 1-1**: Cada usuário só pode ter uma loja
2. ✅ **Relacionamento 1-N**: Uma loja pode ter vários produtos
3. ✅ **Include**: Todas as consultas trazem dados relacionados
4. ✅ **CRUD**: Todas as operações estão funcionando
5. ✅ **Cascata**: Deletar usuário remove loja e produtos