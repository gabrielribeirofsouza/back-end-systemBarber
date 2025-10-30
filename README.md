# 💈 SystemBarber - API Back-End

O **SystemBarber** é a API back-end de um sistema de agendamento para barbearias.  
Este projeto foi desenvolvido com **Java + Spring Boot**, utilizando **MySQL** como banco de dados relacional.  
A API é responsável pelo gerenciamento de clientes, barbeiros, serviços e agendamentos.

---

## 📄 Documentação do banco de dados

 [Análise de Requisitos](https://github.com/gabrielribeirofsouza/back-end-systemBarber/blob/main/An%C3%A1lise%20de%20Requisitos%20-%20systemBarber.pdf)  




## 🧩 Endpoints Principais 
Método	Rota	Descrição
GET	/clientes	Lista todos os clientes
GET	/barbeiros	Lista todos os barbeiros
GET	/servicos	Lista os serviços disponíveis
POST	/agendamentos	Cria um novo agendamento
DELETE	/agendamentos/{id}	Remove um agendamento
