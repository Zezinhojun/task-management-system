const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../../middlewares/authmiddlewares')


// Rota para registrar um novo usuário
router.post('/register', userController.validateUserRegistration, userController.registerUser);

// Rota para fazer login de usuário
router.post('/login', userController.loginUser);
// Rota para deletar usuário
router.delete('/user/:id', authenticateToken, userController.deleteUserById)

module.exports = router