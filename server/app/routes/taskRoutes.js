const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

// Rota para registrar um novo usuário
router.post('/register', userController.validateUserRegistration, userController.registerUser);

// Rota para fazer login de usuário
router.post('/login', userController.loginUser);
// Rota para criar uma nova 


router.post('/tasks', [
    // Validar o campo 'title'
    body('title')
        .notEmpty().withMessage('O título não pode estar vazio')
        .isLength({ max: 255 }).withMessage('O título deve ter no máximo 255 caracteres'),

    // Validar o campo 'description'
    body('description')
        .isLength({ min: 5 }).withMessage('A descrição deve ter pelo menos 5 caracteres')
        .isLength({ max: 1000 }).withMessage('A descrição deve ter no máximo 1000 caracteres'),
], taskController.createTask);

// Rota para listar todas as tarefas
router.get('/tasks', taskController.getAllTasks)

// Rota para buscar uma tarefa por ID
router.get('/tasks/:id', taskController.getTaskById);

// Rota para atualizar uma tarefa por ID
router.put('/tasks/:id', taskController.updateTaskById);

// Rota para excluir uma tarefa por ID
router.delete('/tasks/:id', taskController.deleteTaskById);


module.exports = router;
