// Importa os módulos necessários para trabalhar com SQLite.
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

// Função assíncrona que retorna uma conexão com o banco de dados SQLite.
async function sqliteConnection() {
    // Abre uma conexão com o banco de dados usando o módulo 'sqlite'.
    const database = await sqlite.open({
        // Configura o nome do arquivo do banco de dados e o resolve para o caminho absoluto usando '__dirname'.
        filename: path.resolve(__dirname, "..", "database.db"),
        // Especifica o driver SQLite a ser utilizado.
        driver: sqlite3.Database
    });

    // Retorna a conexão com o banco de dados.
    return database;
}

// Exporta a função 'sqliteConnection' para que possa ser utilizada em outros lugares.
module.exports = sqliteConnection;
