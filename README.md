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
    },
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

### Documentação das APIs

### REST API

A API REST oferece os seguintes endpoints:

- **`/api/car/`**:
  - `GET`: Lista todos os carros.
  - `POST`: Cria um novo carro.

- **`/api/car/<id>/`**:
  - `GET`: Obtém detalhes de um carro específico.
  - `PUT`: Atualiza um carro existente.
  - `DELETE`: Remove um carro.

- **`/api/photo/`**:
  - `GET`: Lista todas as fotos.
  - `POST`: Faz upload de uma nova foto.

- **`/api/photo/<id>/`**:
  - `GET`: Obtém detalhes de uma foto específica.

- **`/auth/signup/`**:
  - `POST`: Registra um novo usuário.

- **`/auth/login/`**:
  - `POST`: Autentica um usuário e retorna um token JWT.

### GraphQL API

A API GraphQL está disponível no endpoint `/graphql/` e oferece as seguintes funcionalidades:

#### Queries

- `cars`: Lista todos os carros.
- `car(id: ID!)`: Obtém detalhes de um carro específico.
- `photos`: Lista todas as fotos.
- `photo(id: ID!)`: Obtém detalhes de uma foto específica.
- `me`: Obtém informações do usuário autenticado.

#### Mutations

- `createCar(name: String!, status: Int!, photoId: ID!)`: Cria um novo carro.
- `updateCar(id: ID!, name: String, status: Int, photoId: ID)`: Atualiza um carro existente.
- `deleteCar(id: ID!)`: Remove um carro.
- `createPhoto(base64: String!)`: Faz upload de uma nova foto.
- `createUser(username: String!, email: String!, password: String!)`: Registra um novo usuário.
- `tokenAuth(username: String!, password: String!)`: Autentica um usuário e retorna um token JWT.
- `verifyToken(token: String!)`: Verifica a validade de um token JWT.
- `refreshToken(token: String!)`: Renova um token JWT.

### GraphQL API

A API também oferece suporte a GraphQL através do endpoint `/graphql/`. A interface GraphiQL está habilitada para facilitar o desenvolvimento e testes.

### Autenticação

Para autenticar usando GraphQL, use as seguintes mutations:

```graphql
# Obter token
mutation {
  tokenAuth(username: "seu_usuario", password: "sua_senha") {
    token
  }
}

# Verificar token
mutation {
  verifyToken(token: "seu_token") {
    payload
  }
}

# Renovar token
mutation {
  refreshToken(token: "seu_token") {
    token
  }
}
```

### Queries

```graphql
# Listar todos os carros
query {
  cars {
    id
    Name
    Status
    statusDisplay
    Photo {
      id
      Base64
    }
  }
}

# Buscar carro por ID
query {
  car(id: "1") {
    id
    Name
    Status
    statusDisplay
    Photo {
      id
      Base64
    }
  }
}

# Listar todas as fotos
query {
  photos {
    id
    Base64
  }
}

# Buscar foto por ID
query {
  photo(id: "1") {
    id
    Base64
  }
}

# Informações do usuário atual
query {
  me {
    id
    username
    email
  }
}
```

### Mutations

```graphql
# Criar usuário
mutation {
  createUser(username: "novo_usuario", email: "usuario@email.com", password: "senha123") {
    user {
      id
      username
      email
    }
  }
}

# Criar carro
mutation {
  createCar(name: "Novo Carro", status: 1, photoId: "1") {
    car {
      id
      Name
      Status
      statusDisplay
      Photo {
        id
        Base64
      }
    }
  }
}

# Atualizar carro
mutation {
  updateCar(id: "1", name: "Carro Atualizado", status: 0) {
    car {
      id
      Name
      Status
      statusDisplay
    }
  }
}

# Deletar carro
mutation {
  deleteCar(id: "1") {
    success
  }
}

# Criar foto
mutation {
  createPhoto(base64: "dados_base64_da_imagem") {
    photo {
      id
      Base64
    }
  }
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