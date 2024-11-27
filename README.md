## Documentação da API

### Autenticação

A API utiliza autenticação baseada em token. Para acessar os endpoints protegidos, inclua o token no cabeçalho da requisição:

```
Authorization: Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### Endpoints

#### Autenticação

##### Registro de Usuário
- **URL**: `/auth/signup/`
- **Método**: POST
- **Corpo da Requisição**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Respostas**:
  - 201: Usuário criado com sucesso
  - 400: Dados inválidos

##### Login
- **URL**: `/auth/login/`
- **Método**: POST
- **Corpo da Requisição**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Respostas**:
  - 200: Login bem-sucedido (retorna token)
  - 400: Credenciais inválidas

#### Carros

##### Listar Carros
- **URL**: `/api/car/`
- **Método**: GET
- **Autenticação**: Requerida
- **Respostas**:
  - 200: Lista de carros

##### Criar Carro
- **URL**: `/api/car/`
- **Método**: POST
- **Autenticação**: Requerida
- **Corpo da Requisição**:
  ```json
  {
    "model": "string",
    "brand": "string",
    "status": 1
  }
  ```
- **Respostas**:
  - 201: Carro criado com sucesso
  - 400: Dados inválidos

##### Detalhes do Carro
- **URL**: `/api/car/{id}/`
- **Método**: GET
- **Autenticação**: Requerida
- **Respostas**:
  - 200: Detalhes do carro
  - 404: Carro não encontrado

##### Atualizar Carro
- **URL**: `/api/car/{id}/`
- **Método**: PUT
- **Autenticação**: Requerida
- **Corpo da Requisição**: Mesmo formato da criação
- **Respostas**:
  - 200: Carro atualizado com sucesso
  - 400: Dados inválidos
  - 404: Carro não encontrado

##### Excluir Carro
- **URL**: `/api/car/{id}/`
- **Método**: DELETE
- **Autenticação**: Requerida
- **Respostas**:
  - 204: Carro excluído com sucesso
  - 404: Carro não encontrado

#### Fotos

##### Listar Fotos
- **URL**: `/api/photo/`
- **Método**: GET
- **Autenticação**: Requerida
- **Respostas**:
  - 200: Lista de fotos

##### Enviar Foto
- **URL**: `/api/photo/`
- **Método**: POST
- **Autenticação**: Requerida
- **Corpo da Requisição** (multipart/form-data):
  ```json
  {
    "car": "integer",
    "image": "arquivo",
    "description": "string"
  }
  ```
- **Respostas**:
  - 201: Foto enviada com sucesso
  - 400: Dados inválidos

##### Detalhes da Foto
- **URL**: `/api/photo/{id}/`
- **Método**: GET
- **Autenticação**: Requerida
- **Respostas**:
  - 200: Detalhes da foto
  - 404: Foto não encontrada

### Enums

#### Status do Carro
- `0`: INDISPONÍVEL
- `1`: DISPONÍVEL

## Desenvolvimento

Este projeto utiliza:
- Django 4.2.13
- Django REST Framework 3.14.0
- Banco de dados PostgreSQL
- Autenticação baseada em Token

Para debugar, utilize a configuração de debug fornecida em `.vscode/launch.json`.
