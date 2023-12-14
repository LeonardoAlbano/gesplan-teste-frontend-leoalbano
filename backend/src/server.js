// Importa o módulo 'express-async-errors' para lidar automaticamente com erros assíncronos no Express.
require("express-async-errors");

// Importa o módulo que contém as configurações e funções relacionadas ao banco de dados SQLite.
const migrationsRun = require("./database/sqlite/migrations");

// Importa o módulo 'express'.
const express = require('express');

// Importa as rotas definidas no arquivo 'routes.js'.
const routes = require("./routes");

const cors = require("cors");

// Importa a classe 'AppError' definida no arquivo 'utils/AppError.js'.
const AppError = require("./utils/AppError");

// Cria uma instância do aplicativo Express.
const app = express();

app.use(cors());

// Habilita o middleware do Express para processar dados em formato JSON.
app.use(express.json());

// Utiliza as rotas definidas no arquivo 'routes.js'.
app.use(routes);

// Inicializa a conexão com o banco de dados SQLite.
migrationsRun();

// Middleware para tratamento de erros.
app.use((error, request, response, next) => {
    // Verifica se o erro é uma instância da classe 'AppError'.
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    // Se não for um 'AppError', imprime o erro no console.
    console.error(error);

    // Retorna uma resposta de erro interno do servidor para qualquer outro tipo de erro.
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

// Define a porta em que o servidor irá escutar as requisições.
const PORT = 8080;

// Inicia o servidor na porta especificada e exibe uma mensagem no console quando estiver pronto.
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
