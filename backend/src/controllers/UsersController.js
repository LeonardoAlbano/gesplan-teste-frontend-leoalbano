// Importa a classe 'AppError' definida no arquivo '../utils/AppError'.
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite")

// Define a classe 'UsersController'.
class UsersController {
    // Método 'create' responsável por lidar com a criação de usuários.
    async create(request, response) {
        // Extrai os dados do corpo da requisição.
        const { nome, email, telefone, tipoFornecedor, observacao } = request.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get(" SELECT * FROM users WHERE email = (?)", [email])
        
        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso.");
        }

        await database.run(
            "INSERT INTO users ( nome, email, telefone, fornecedor, observacao) VALUES (?, ?, ?, ?, ?)",
            [ nome, email, telefone, tipoFornecedor, observacao ]
            );

        return response.status(201).json();
    }

    async update(request, response){
        const { nome, email, telefone, tipoFornecedor, observacao } = request.body;
        const { id } = request.params

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso.")
        }

        user.nome = nome ?? user.nome;
        user.email = email ?? user.email;
        user.telefone = telefone ?? user.telefone;
        user.tipoFornecedor = tipoFornecedor ?? user.tipoFornecedor;
        user.observacao = observacao ?? user.observacao;

        await database.run(`
          UPDATE users SET
          nome = ?,
          email = ?,
          telefone = ?,
          tipoFornecedor = ?,
          observacao = ?,
          updated_at = DATETIME('now')
          WHERE id = ?`,
          [user.nome, user.email, user.telefone, user.tipoFornecedor, user.observacao, id]
          );

          return response.status(201).json()
    }

    async delete(request, response) {
        const { id } = request.params;
    
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    
        if (!user) {
          throw new AppError("Usuário não encontrado");
        }
    
        await database.run("DELETE FROM users WHERE id = (?)", [id]);
    
        return response.status(204).send(); // Status 204 indica que a solicitação foi bem-sucedida, mas não há conteúdo para enviar.
    }
    
}

// Exporta a classe 'UsersController' para que possa ser utilizada em outros lugares.
module.exports = UsersController;
