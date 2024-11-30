# Kanban

Este é um projeto de **Kanban** que oferece uma solução de gerenciamento de tarefas utilizando uma arquitetura dividida em API, frontend e websockets.

## Estrutura do Projeto

O repositório é dividido nas seguintes pastas:

- **API**: Contém a API que gerencia a lógica de backend.
- **Frontend**: Contém o código do frontend que interage com a API.
- **Websockets**: Gerencia a comunicação em tempo real entre o frontend e o backend.

## Requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org) (Recomendado: versão 16.x ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório ou baixe os arquivos:

   ```bash
   git clone <URL-do-repositório>
   cd <nome-do-repositório>
   ```

2. Instale as dependências em cada uma das pastas (`API`, `Front`, `Websockets`):

   - Navegue até a pasta desejada e execute o comando para instalar as dependências:

     ```bash
     cd <nomePasta>
     npm install
     ```

   Repita esse processo para as pastas **API**, **Front** e **Websockets**.

## Executando o Projeto

### 1. API

Para iniciar a API, navegue até a pasta `API` e execute:

```bash
cd api
docker compose up -d
npm start run:dev
```

A API será iniciada na porta configurada no arquivo de ambiente (geralmente, `localhost:3000`).

### 2. Frontend

Para iniciar o frontend, siga os seguintes passos:

- Navegue até a pasta `front`:

  ```bash
  cd front
  ```

- Execute o seguinte comando para iniciar a aplicação frontend:

  ```bash
  cd src
  node index.js
  ```

O frontend será iniciado e poderá ser acessado no seu navegador, normalmente na porta `localhost:3001` ou conforme configurado.

### 3. Websockets

Os **Websockets** são usados para comunicação em tempo real entre os clientes. Para iniciar a parte de websockets, navegue até a pasta `websockets` e execute:

```bash
cd websocket-server
npx y-websocket
```


### CRÉDITOS

y-websocket-server: https://github.com/yjs/y-websocket

