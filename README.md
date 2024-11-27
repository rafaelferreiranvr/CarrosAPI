## Documentação da API

### Autenticação

A API utiliza autenticação baseada em token. Para acessar os endpoints protegidos, inclua o token no cabeçalho da requisição:

```
Authorization: Token <seu-token>
```

### REST API

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
        "Name": "Nome do Carro",
        "Status": 1
    },
    {
        "id": 2,
        "Name": "Outro Carro",
        "Status": 0
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
    "Name": "Nome do Carro",
    "Status": 1
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
    "Name": "Nome do Carro",
    "Status": 1
}
```

##### Atualizar Carro
- **URL**: `/api/car/{id}/`
- **Método**: PUT
- **Autenticação**: Requerida
- **Solicitação**:
```json
{
    "Name": "Nome Atualizado",
    "Status": 0
}
```
- **Resposta de Sucesso** (200 OK):
```json
{
    "id": 1,
    "Name": "Nome Atualizado",
    "Status": 0
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
    "Base64": "string_base64_da_imagem"
}
```
- **Resposta de Sucesso** (201 Created)

### GraphQL API

A API GraphQL está disponível no endpoint `/graphql/` e oferece as seguintes funcionalidades:

#### Queries

##### Listar Carros
- **Query**:
```graphql
query {
  cars {
    id
    Name
    Status
    statusDisplay
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
        "Name": "Nome do Carro",
        "Status": 1,
        "statusDisplay": "DISPONIVEL"
      }
    ]
  }
}
```

##### Criar Carro
- **Mutation**:
```graphql
mutation {
  createCar(name: "Novo Carro", status: 1) {
    car {
      id
      Name
      Status
      statusDisplay
    }
  }
}
```
- **Resposta**:
```json
{
  "data": {
    "createCar": null
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