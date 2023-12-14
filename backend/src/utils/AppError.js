// Define uma classe chamada AppError.
class AppError {
    // Declara propriedades da classe para armazenar a mensagem de erro e o código de status HTTP.
    message;
    statusCode;

    // Construtor da classe AppError, que aceita uma mensagem de erro e um código de status HTTP opcional (padrão é 400 - Bad Request).
    constructor(message, statusCode = 400) {
        // Atribui a mensagem de erro à propriedade 'message'.
        this.message = message;
        
        // Atribui o código de status HTTP à propriedade 'statusCode'.
        this.statusCode = statusCode;
    }
}

// Exporta a classe AppError para que possa ser utilizada em outros arquivos.
module.exports = AppError;
