# 💈 SystemBarber - API Back-End

O **SystemBarber** é a API back-end de um sistema de agendamento para barbearias.  

---

## 📄 Documentação do banco de dados

 [Análise de Requisitos.pdf - Download](https://github.com/gabrielribeirofsouza/back-end-systemBarber/raw/main/An%C3%A1lise%20de%20Requisitos%20-%20systemBarber.pdf)

[Modelo lógico.pdf - Download](https://github.com/gabrielribeirofsouza/back-end-systemBarber/raw/main/systemBarber%20-%20MODELO%20LOGICO.pdf)

[Dicionário de dados.pdf - Download](https://github.com/gabrielribeirofsouza/back-end-systemBarber/blob/main/systemBarber%20-%20Dicion%C3%A1rio%20de%20dados.pdf)

## ⚙️ Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **Express.js** – Framework para criação de rotas e middlewares
- **MySQL** – Banco de dados relacional para persistência das informações
- **bcrypt** – Criptografia de senhas para segurança do usuário
- **cors** – Controle de acesso entre domínios
- **dotenv** – Gerenciamento de variáveis de ambiente
- **uuid** – Geração de identificadores únicos
- **nodemon** – Ambiente de desenvolvimento com auto reload

---

## 🚀 Funcionalidades Principais

- **Gerenciamento de Usuários:** cadastro, login com validação e criptografia de senha.  
- **CRUD de Serviços:** criação, listagem, atualização e exclusão de serviços oferecidos.  
- **CRUD de Produtos:** controle completo do catálogo de produtos disponíveis.  
- **Agendamento de Horários:** estrutura para controle de agenda da barbearia.  
- **Integração com Front-end React:** comunicação via API REST padronizada e eficiente.

- ## 🔐 Boas Práticas Implementadas

- ✅ **Segurança de dados**: uso de `bcrypt` para armazenar senhas de forma criptografada.
- ✅ **JSON Web Token (JWT)** para autenticação segura entre cliente e servidor.
- ✅ **Tratamento de erros padronizado**: respostas consistentes da API para o front-end.  
- ✅ **Variáveis de ambiente protegidas** com `dotenv`.    
- ✅ **Rotas separadas por contexto** (usuários, serviços, produtos, agenda).  
- ✅ **Facilidade de manutenção e escalabilidade**, permitindo adicionar novas funcionalidades com facilidade.  
- ✅ **Mensagens de retorno claras** para o cliente (sucesso, erro, validação).  

---
