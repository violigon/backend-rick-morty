# Rick & Morty Back-end

Este é o servidor back-end em Node.js/Express para o projeto **Rick & Morty**, criado como material didático em aulas de Desenvolvimento Web. Ele fornece uma API RESTful para gerenciar personagens, demonstrando conceitos de bancos NoSQL e criação de endpoints.

## Funcionalidades

* **CRUD** completo de personagens (Create, Read, Update, Delete)
* Endpoints RESTful padronizados
* Suporte a IDs numéricos (do Rick & Morty API) e ObjectId (MongoDB)
* Validação básica de payloads em POST e PUT
* Tratamento de erros com status HTTP adequados (400, 404, 204)
* Configuração de CORS para permitir acesso de qualquer origem

## Tecnologias

* Node.js
* Express
* MongoDB Atlas
* dotenv (variáveis de ambiente)

## Instalação e execução

1. Clone este repositório:

   ```bash
   git clone <URL_DO_REPO_BACKEND>
   cd nome-do-repo-backend
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz com base no `.env.example`:

   ```env
   DB_USER=<seu-usuario>
   DB_PASSWORD=<sua-senha>
   DB_NAME=<nome-do-banco>
   DB_CHAR=<shardChar>
   PORT=3001
   ```
4. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm start
   ```
5. Acesse `http://localhost:3001` para usar a API.

## Estrutura de pastas

```plaintext
.
├── index.js           # Ponto de entrada e definição de rotas
├── .env.example       # Exemplo de variáveis de ambiente
├── package.json       # Dependências e scripts
└── package-lock.json  # Versões travadas das dependências
```

## Endpoints disponíveis

| Método | Rota               | Descrição                                      |
| ------ | ------------------ | ---------------------------------------------- |
| GET    | `/personagens`     | Lista todos os personagens                     |
| GET    | `/personagens/:id` | Busca personagem por ID (numérico ou ObjectId) |
| POST   | `/personagens`     | Cria um novo personagem                        |
| PUT    | `/personagens/:id` | Atualiza personagem existente                  |
| DELETE | `/personagens/:id` | Remove personagem por ID                       |

> **Observação**: Para parâmetros `:id`, são aceitos tanto IDs numéricos quanto strings de 24 caracteres hexadecimal.

---

Este back-end faz parte de um conteúdo educacional para aulas de Desenvolvimento Web, ilustrando a construção de APIs REST e integração com MongoDB.
