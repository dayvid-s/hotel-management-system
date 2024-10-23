# Hotel Management System

## Entrega do Projeto
Este repositório contém a aplicação completa do sistema de gerenciamento de hotel. A aplicação é dividida em um frontend, backend e um banco de dados
PostgreSQL, ambos orquestrados utilizando Docker.


## Instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (versão 1.27 ou superior)


### Como instalar e configurar o ambiente
1. Clone o repositório:
   git clone https://github.com/dayvid-s/hotel-management-system.git


2.	Na pasta raiz do projeto, aonde está localizado o docker compose, execute o seguinte comando para iniciar os serviços:
    docker-compose up

   

### Como acessar as páginas do frontend (hóspede e administrador)

	•	O frontend estará disponível em http://localhost:3000.
	•	Faça login como hóspede ou administrador usando essas credenciais:
 Usuário do tipo administrador = user.admin@example.com  |   Senha  = admin12345 <br>
 Usuário do tipo hóspede = 63493703090  |  Senha = guest12345

Você também pode estar criando hóspedes e fazendo login.



## Testes

Para rodar os testes com Jest e Supertest, execute:
  docker-compose exec backend npm run test

  


## Documentação

### Backend - Swagger
A documentação da API gerada com Swagger pode ser acessada em:
http://localhost:8000/api


### Frontend - MindMeist
Mapa mental com as regras de negócio do frontend:

https://mm.tt/app/map/3479596931?t=3SXQw3AZjz




### Boas Práticas

Este projeto segue os seguintes padrões e boas práticas:

	•	Utilização de DTOs para validação de dados com class-validator,.
	•	Implementação de autenticação e autorização com JWT e Auth Guards.
	•	Estrutura modular para facilitar manutenção e escalabilidade.
	•	Documentação da API utilizando Swagger.
	•	Utilização de Docker para garantir a consistência do ambiente.

  	
