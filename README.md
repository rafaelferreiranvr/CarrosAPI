## Documentação da API

### Autenticação

A API utiliza autenticação baseada em token. Para acessar os endpoints protegidos, inclua o token no cabeçalho da requisição:

```
Authorization: Token <seu-token>
```

### Endpoints

#### Autenticação

##### Cadastro de Usuário
- **URL**: `/auth/signup/`
- **Método**: POST
- **Corpo da Requisição**:
```json
{
    "username": "exemplo_usuario",
    "email": "usuario@exemplo.com",
    "password": "senha123"
}
```
- **Resposta de Sucesso** (201 Created):
```json
{
    "id": 1,
    "username": "exemplo_usuario",
    "email": "usuario@exemplo.com"
}
```

##### Login
- **URL**: `/auth/login/`
- **Método**: POST
- **Corpo da Requisição**:
```json
{
    "email": "usuario@exemplo.com",
    "password": "senha123"
}
```
- **Resposta de Sucesso** (200 OK):
```json
{
    "token": "seu-token-aqui"
}
```
- **Resposta de Erro** (400 Bad Request):
```json
{
    "error": "Invalid credentials"
}
```

#### Carros

##### Listar Carros
- **URL**: `/api/car/`
- **Método**: GET
- **Autenticação**: Requerida
- **Resposta de Sucesso** (200 OK):
```json
[
    {
        "id": 1,
        "Name": "Nome do Carro",
        "Status": 1,
        "Photo": 1
    }
]
```

##### Criar Carro
- **URL**: `/api/car/`
- **Método**: POST
- **Autenticação**: Requerida
- **Corpo da Requisição**:
```json
{
    "Name": "Nome do Carro",
    "Status": 1,
    "Photo": 1
}
```
- **Resposta de Sucesso** (201 Created):
```json
{
    "id": 1,
    "Name": "Nome do Carro",
    "Status": 1,
    "Photo": 1
}
```

##### Detalhes do Carro
- **URL**: `/api/car/{id}/`
- **Método**: GET
- **Autenticação**: Requerida
- **Resposta de Sucesso** (200 OK):
```json
{
    "id": 1,
    "Name": "Nome do Carro",
    "Status": 1,
    "Photo": 1
}
```

##### Atualizar Carro
- **URL**: `/api/car/{id}/`
- **Método**: PUT
- **Autenticação**: Requerida
- **Corpo da Requisição**: Mesmo formato da criação
- **Resposta de Sucesso** (200 OK): Mesmo formato do detalhe

##### Excluir Carro
- **URL**: `/api/car/{id}/`
- **Método**: DELETE
- **Autenticação**: Requerida
- **Resposta de Sucesso** (204 No Content)

#### Fotos

##### Upload de Foto
- **URL**: `/api/photo/`
- **Método**: POST
- **Autenticação**: Requerida
- **Corpo da Requisição**:
```json
{
    "Base64": "string_base64_da_imagem"
}
```
- **Resposta de Sucesso** (201 Created):
```json
{
    "id": 1,
    "Base64": "string_base64_da_imagem"
}
```

### Códigos de Status do Carro

- `DISPONIVEL`: 1
- `INDISPONIVEL`: 0

### Notas Importantes

1. Todos os endpoints protegidos requerem o token de autenticação no cabeçalho
2. As fotos são enviadas em formato Base64
3. As respostas incluem códigos HTTP padrão:
   - 200: Sucesso
   - 201: Criado com sucesso
   - 204: Excluído com sucesso
   - 400: Erro na requisição
   - 401: Não autorizado
   - 404: Não encontrado
