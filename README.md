## Documentação da API
### Docker

Para realizar o deploy da aplicação CarrosAPI utilizando Docker, siga os passos abaixo:

1. **Construir e Iniciar os Containers**:
   - No diretório raiz do projeto, execute o seguinte comando para construir e iniciar os containers:
     ```bash
     docker-compose up --build
     ```
   - Este comando irá construir a imagem e iniciar os serviços definidos no arquivo `docker-compose.yml`.

2. **Acessar a Aplicação**:

   - O Aplicativo estará disponível em `http://localhost:3000/`.
   - A API de Autenticação estará disponível em `http://localhost:3000/auth/`.
   - A API Geral estará disponível em `http://localhost:3000/api/`.

3. **Parar os Containers**:
   - Para parar os containers em execução, utilize o comando:
     ```bash
     docker-compose down

### Aplicativo
O aplicativo fornece uma interface web que auxilia na testagem das APIs, autenticação e exibição de imagens. Disponível em `http://localhost:3000/`.

### Autenticação

Para acessar os endpoints protegidos, inclua o token no cabeçalho da requisição:

```
Authorization: Token <seu-token>
```

### Endpoints de Autenticação

#### Signup (Criar Conta)
- **URL**: `/auth/signup/`
- **Método**: POST
- **Autenticação**: Não
- **Solicitação**:
```json
{
    "username": "seu_usuario",
    "email": "seu_email@exemplo.com",
    "password": "sua_senha"
}
```
- **Códigos de Resposta**:
  - `201 Created`: Conta criada com sucesso
  - `400 Bad Request`: Dados inválidos
    - Usuário já existe: `{"error": "usernameExists"}`
    - Email já existe: `{"error": "userEmailExists"}`
    - Nome de usuário inválido: `{"error": "invalidUsername"}`
    - Email inválido: `{"error": "invalidEmail"}`
    - Senha inválida: `{"error": "invalidPassword"}`
    - Erro desconhecido: `{"error": "unknownError"}`
  - `401 Unauthorized`: Autenticação falhou

#### Login
- **URL**: `/auth/login/`
- **Método**: POST
- **Autenticação**: Não
- **Solicitação**:
```json
{
    "email": "seu_email@exemplo.com",
    "password": "sua_senha"
}
```
- **Resposta de Sucesso** (200 OK):
```json
{
    "token": "seu_token_de_autenticacao"
}
```
- **Códigos de Resposta**:
  - `200 OK`: Login bem-sucedido
  - `400 Bad Request`: Dados inválidos
    - Usuário não encontrado: `{"error": "userNotFound"}`
    - Senha inválida: `{"error": "invalidPassword"}`

#### Logout
- **URL**: `/auth/logout/`
- **Método**: POST
- **Autenticação**: Requerida
- **Códigos de Resposta**:
  - `200 OK`: Logout bem-sucedido
  - `401 Unauthorized`: Token inválido ou expirado

### API REST

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
        "Name": "Carro A",
        "Status": 1,
        "Photo": 10,
        "Base64": "..."
    },
    {
        "id": 2,
        "Name": "Carro B",
        "Status": 0,
        "Photo": 11,
        "Base64": "..."
    }
]
```
- **Códigos de Resposta**:
  - `200 OK`: Sucesso
  - `401 Unauthorized`: Não autenticado

##### Criar Carro
- **URL**: `/api/car/`
- **Método**: POST
- **Autenticação**: Requerida
- **Solicitação**:
```json
{
    "Name": "Carro A",
    "Status": 1,
    "Base64": "data:image/jpeg;base64,..."
}
```
ou
```json
{
    "Name": "Carro A",
    "Status": 1
}
```
- **Códigos de Resposta**:
  - `201 Created`: Carro criado com sucesso
  - `400 Bad Request`: Dados inválidos
  - `401 Unauthorized`: Não autenticado

##### Detalhes do Carro
- **URL**: `/api/car/{id}/`
- **Método**: GET
- **Autenticação**: Requerida
- **Resposta de Sucesso** (200 OK):
```json
{
    "id": 1,
    "Name": "Carro A",
    "Status": 1,
    "Photo": 20,
    "Base64": "..."
}
```
- **Códigos de Resposta**:
  - `200 OK`: Sucesso
  - `401 Unauthorized`: Não autenticado
  - `404 Not Found`: Carro não encontrado

##### Atualizar Carro
- **URL**: `/api/car/{id}/`
- **Método**: PUT
- **Autenticação**: Requerida
- **Solicitação**:
```json
{
    "Name": "Carro A",
    "Status": 1,
    "Base64": "data:image/jpeg;base64,..."
}
```
ou
```json
{
    "Name": "Carro A",
    "Status": 1
}
```
- **Códigos de Resposta**:
  - `200 OK`: Atualização bem-sucedida
  - `400 Bad Request`: Dados inválidos
  - `401 Unauthorized`: Não autenticado
  - `404 Not Found`: Carro não encontrado

##### Excluir Carro
- **URL**: `/api/car/{id}/`
- **Método**: DELETE
- **Autenticação**: Requerida
- **Códigos de Resposta**:
  - `200 OK`: Exclusão bem-sucedida
  - `401 Unauthorized`: Não autenticado
  - `404 Not Found`: Carro não encontrado

#### Buscar Carros
- **URL**: `/api/car/search/`
- **Método**: POST
- **Autenticação**: Requerida (Token)
- **Headers**: {`Authorization`: `Token <seu-token>`}
- **Solicitação**:
```graphql
query Query {
  searchCars(name: "Lam") {
    id
    Status
    Name
  }
}
```
- **Resposta de Sucesso** (200 OK):
```json
{
  "data": {
    "searchCars": [
      {
        "id": "27",
        "Status": "DISPONIVEL",
        "Name": "Lamborghini"
      }
    ]
  }
}
```
- **Códigos de Resposta**:
  - `200 OK`: Sucesso
  - `400 Bad Request`: Query inválida
  - `401 Unauthorized`: Não autenticado

**Valores possíveis para Status**:
- `DISPONIVEL`: Carro disponível
- `INDISPONIVEL`: Carro indisponível

#### Fotos

##### Listar Fotos
- **URL**: `/api/photo/`
- **Método**: GET
- **Autenticação**: Requerida
- **Resposta de Sucesso** (200 OK):
```json
[
    {
        "id": 19,
        "Base64": "..."
    },
    {
        "id": 20,
        "Base64": "..."
    }
]
```
- **Códigos de Resposta**:
  - `200 OK`: Sucesso
  - `401 Unauthorized`: Não autenticado

##### Upload de Foto
- **URL**: `/api/photo/`
- **Método**: POST
- **Autenticação**: Requerida
- **Solicitação**:
```json
{
    "Base64": "..."
}
```
- **Códigos de Resposta**:
  - `201 Created`: Foto criada com sucesso
  - `400 Bad Request`: Dados inválidos
  - `401 Unauthorized`: Não autenticado

##### Detalhes da Foto
- **URL**: `/api/photo/{id}`
- **Método**: GET
- **Autenticação**: Requerida
- **Resposta de Sucesso** (200 OK):
```json
{
    "id": 19,
    "Base64": "..."
}
```
- **Códigos de Resposta**:
  - `200 OK`: Sucesso
  - `401 Unauthorized`: Não autenticado
  - `404 Not Found`: Foto não encontrada

##### Renderizar Foto
- **URL**: `/api/photo/render/{id}`
- **Método**: GET
- **Autenticação**: Requerida
- **Resposta**: Imagem
- **Códigos de Resposta**:
  - `200 OK`: Sucesso
  - `401 Unauthorized`: Não autenticado
  - `404 Not Found`: Foto não encontrada