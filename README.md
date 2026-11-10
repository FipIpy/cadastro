# Cadastro

Aplicação de cadastro de usuários com uma interface em React e uma API em Node.js, Express e MongoDB. O formulário recebe nome, e-mail e senha, valida os campos e a confirmação da senha, informa quando o e-mail já está cadastrado e envia o cadastro à API. As senhas são armazenadas com hash bcrypt.

## Tecnologias

- React e Vite
- Node.js e Express
- MongoDB com Mongoose
- Axios, Tailwind CSS e React Icons
- bcrypt para hash de senhas

## Executar localmente

Pré-requisitos: Node.js e acesso a uma instância MongoDB.

Instale as dependências na raiz e no frontend:

```bash
npm install
npm install --prefix frontend/cadastro
```

Configure a conexão com o MongoDB em `backend/src/api/server.js`. Mantenha credenciais fora dos arquivos versionados.

Em um terminal, inicie a API:

```bash
node backend/src/api/server.js
```

Em outro terminal, inicie a interface:

```bash
npm --prefix frontend/cadastro run dev
```

Abra no navegador o endereço local exibido pelo Vite.

## Scripts do frontend

```bash
npm --prefix frontend/cadastro run build
npm --prefix frontend/cadastro run lint
npm --prefix frontend/cadastro run preview
```
