const jwt = require('jsonwebtoken');
const { throwErrorIfNotFound } = require('./errorHandler')
require("dotenv").config();

// Middleware de autenticação JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Extrai o token do cabeçalho 'Authorization'

    if (!token) {
        throwErrorIfNotFound(token, 'Token de autentificação não fornecido', 401)
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) {
            throwErrorIfNotFound(err, 'Token de autenticação inválido', 403)
        }
        req.user = user; // Define req.user com os dados do usuário autenticado
        next();
    });
}

module.exports = authenticateToken;
