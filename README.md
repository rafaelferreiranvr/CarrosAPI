## Documentação da API

### Docker

Para realizar o deploy da aplicação CarrosAPI utilizando Docker, siga os passos abaixo:

1. **Construir e Iniciar os Containers**:
   - No diretório raiz do projeto, execute o seguinte comando para construir e iniciar os containers:
     ```bash
     docker-compose up --build
     ```
   - Este comando irá construir as imagens Docker e iniciar os serviços definidos no arquivo `docker-compose.yml`.

2. **Acessar a Aplicação**:
   - A aplicação estará disponível em `http://localhost:8000`.

3. **Parar os Containers**:
   - Para parar os containers em execução, utilize o comando:
     ```bash
     docker-compose down
     ```

### Autenticação

A API utiliza autenticação baseada em token. Para acessar os endpoints protegidos, inclua o token no cabeçalho da requisição:

```
Authorization: Token <seu-token>
```

### Visão Geral da API

#### Modelos
- **Carro**: Representa um carro com os campos `Nome`, `Status` e uma chave estrangeira para `Foto`.
- **Foto**: Contém campos `Extensão` e `Base64` para dados de imagem.

#### Serializadores
- **CarroSerializer**: Serializa objetos `Carro` com campos `id`, `Nome`, `Status` e `Foto`.
- **FotoSerializer**: Serializa objetos `Foto` com campos `id`, `Extensão` e `Base64`.

#### Visualizações
- **CarroViewSet**: Fornece operações CRUD para objetos `Carro` com autenticação JWT.
- **FotoViewSet**: Fornece operações de criação e recuperação para objetos `Foto` com autenticação JWT.

### API REST

#### Carros

##### Listar Carros
- **URL**: `/api/car/`
- **Método**: GET
- **Autenticação**: Requerida
- **Solicitação**: Nenhum corpo necessário.
- **Resposta de Sucesso** (200 OK):
```json
[
    {
        "id": 1,
        "Nome": "Nome do Carro",
        "Status": 1,
        "Foto": {
            "id": 1,
            "Extensão": "jpg",
            "Base64": "string_base64_da_imagem"
        }
    },
    {
        "id": 2,
        "Nome": "Outro Carro",
        "Status": 0,
        "Foto": null
    }
]
```

##### Criar Carro
- **URL**: `/api/car/`
- **Método**: POST
- **Autenticação**: Requerida
- **Solicitação**:
```json
{
    "Nome": "Nome do Carro",
    "Status": 1,
    "Foto": {
        "Extensão": "jpg",
        "Base64": "string_base64_da_imagem"
    }
}
```
- **Resposta de Sucesso** (201 Created)

##### Detalhes do Carro
- **URL**: `/api/car/{id}/`
- **Método**: GET
- **Autenticação**: Requerida
- **Solicitação**: Nenhum corpo necessário.
- **Resposta de Sucesso** (200 OK):
```json
{
    "id": 1,
    "Nome": "Nome do Carro",
    "Status": 1,
    "Foto": {
        "id": 1,
        "Extensão": "jpg",
        "Base64": "string_base64_da_imagem"
    }
}
```

##### Atualizar Carro
- **URL**: `/api/car/{id}/`
- **Método**: PUT
- **Autenticação**: Requerida
- **Solicitação**:
```json
{
    "Nome": "Nome Atualizado",
    "Status": 0,
    "Foto": {
        "Extensão": "png",
        "Base64": "novo_string_base64_da_imagem"
    }
}
```
- **Resposta de Sucesso** (200 OK):
```json
{
    "id": 1,
    "Nome": "Nome Atualizado",
    "Status": 0,
    "Foto": {
        "id": 1,
        "Extensão": "png",
        "Base64": "novo_string_base64_da_imagem"
    }
}
```

##### Excluir Carro
- **URL**: `/api/car/{id}/`
- **Método**: DELETE
- **Autenticação**: Requerida
- **Solicitação**: Nenhum corpo necessário.
- **Resposta de Sucesso** (204 No Content)

#### Fotos

##### Upload de Foto
- **URL**: `/api/photo/`
- **Método**: POST
- **Autenticação**: Requerida
- **Solicitação**:
```json
{
    "Extensão": "jpg",
    "Base64": "string_base64_da_imagem"
}
```
- **Resposta de Sucesso** (201 Created)

### API GraphQL

A API GraphQL está disponível no endpoint `/graphql/` e oferece as seguintes funcionalidades:

#### Consultas

##### Listar Carros
- **Query**:
```graphql
query {
  cars {
    id
    Nome
    Status
    statusDisplay
    Foto {
      id
      Extensão
      Base64
    }
  }
}
```
- **Resposta**:
```json
{
  "data": {
    "cars": [
      {
        "id": 1,
        "Nome": "Nome do Carro",
        "Status": 1,
        "statusDisplay": "DISPONIVEL",
        "Foto": {
          "id": 1,
          "Extensão": "jpg",
          "Base64": "string_base64_da_imagem"
        }
      }
    ]
  }
}
```

##### Criar Carro
- **Mutation**:
```graphql
mutation {
  createCar(name: "Novo Carro", status: 1, photo: { Extensão: "jpg", Base64: "string_base64_da_imagem" }) {
    car {
      id
      Nome
      Status
      statusDisplay
      Foto {
        id
        Extensão
        Base64
      }
    }
  }
}
```
- **Resposta**:
```json
{
  "data": {
    "createCar": {
      "car": {
        "id": 1,
        "Nome": "Novo Carro",
        "Status": 1,
        "statusDisplay": "DISPONIVEL",
        "Foto": {
          "id": 1,
          "Extensão": "jpg",
          "Base64": "string_base64_da_imagem"
        }
      }
    }
  }
}
```

### Visão Geral da Autenticação

#### Modelos
- **UserToken**: Estende o modelo `Token` do Django para incluir funcionalidade de expiração.

#### Serializadores
- **UserSerializer**: Serializa objetos `User` com campos `id`, `username`, `email` e `password`.
- **LoginSerializer**: Gerencia o login do usuário com `email` e `password`.

#### Visualizações
- **SignupViewSet**: Gerencia o cadastro do usuário.
- **UserLoginApiView**: Gerencia o login do usuário e geração de token.

#### Autenticação
- Utiliza `UserTokenAuthentication` para proteger os endpoints da API.

#### Notas
- Os tokens são verificados por expiração e revogados automaticamente se expirados.

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