// Importa o módulo 'Router' do pacote 'express'.
const { Router } = require("express");

// Importa as rotas definidas no arquivo 'users.routers'.
const usersRouter = require("./users.routers");

// Cria uma instância de 'Router' para configurar as rotas.
const routes = Router();

// Define um middleware para roteamento, associando as rotas do 'usersRouter' ao caminho "/users".
routes.use("/users", usersRouter);

// Exporta as configurações de rotas para que possam ser utilizadas em outros arquivos.
module.exports = routes;
