// Importa o módulo 'Router' do pacote 'express'.
const { Router } = require("express");

// Importa o controlador (controller) para usuários definido no arquivo '../controllers/UsersController'.
const UsersController = require("../controllers/UsersController");

// Cria uma instância de 'Router' para configurar as rotas relacionadas aos usuários.
const userRoutes = Router();

// Cria uma instância do controlador de usuários.
const usersController = new UsersController();

// Define uma rota que responde a requisições POST para o caminho "/" (raiz) usando o método 'create' do controlador de usuários.
userRoutes.post("/", usersController.create);

// Define uma rota que responde a requisições PUT para o caminho "/:id" usando o método 'update' do controlador de usuários.
userRoutes.put("/:id", usersController.update);

// Define uma rota que responde a requisições DELETE para o caminho "/:id" usando o método 'delete' do controlador de usuários.
userRoutes.delete("/:id", usersController.delete);

// Exporta as configurações de rota para serem utilizadas em outros lugares, como em um arquivo de rotas principal.
module.exports = userRoutes;
