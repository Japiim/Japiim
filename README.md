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

2. Instale as dependências em cada uma das pastas (`API`, `Frontend`, `Websockets`):

   - Navegue até a pasta desejada e execute o comando para instalar as dependências:

     ```bash
     cd <nomePasta>
     npm install
     ```

   Repita esse processo para as pastas **API**, **Frontend** e **Websockets**.

## Executando o Projeto

### 1. API

Para iniciar a API, navegue até a pasta `API` e execute:

```bash
cd API
npm start
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
  dc src
  node index.js
  ```

O frontend será iniciado e poderá ser acessado no seu navegador, normalmente na porta `localhost:8080` ou conforme configurado.

### 3. Websockets

Os **Websockets** são usados para comunicação em tempo real entre o frontend e o backend. Para iniciar a parte de websockets, navegue até a pasta `websockets` e execute:

```bash
cd websockets
npm start
```

O servidor de websockets estará em execução e pronto para se comunicar com a API e o frontend.
