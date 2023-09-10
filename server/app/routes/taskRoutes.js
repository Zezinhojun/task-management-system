const express = require('express');
const router = express.Router();
const Task = require('../models/task')
const { body, validationResult } = require('express-validator');
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
], async (req, res) => {
    // Verificar se houve erros de validação
    const errors = validationResult(req);

    // Se houver erros, retornar uma resposta de erro
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Se a validação for bem-sucedida, continue com o processamento
    try {
        const taskData = req.body;
        const task = new Task(taskData);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para listar todas as tarefas
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Busque todas as tarefas no banco de dados
        res.json(tasks); // Responda com a lista de tarefas
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para buscar uma tarefa por ID
router.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId); // Busque a tarefa pelo ID
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json(task); // Responda com a tarefa encontrada
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar uma tarefa por ID
router.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body; // Dados de atualização da tarefa
        const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json(task); // Responda com a tarefa atualizada
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Rota para excluir uma tarefa por ID
router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndRemove(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
