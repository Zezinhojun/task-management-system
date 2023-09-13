// TaskController.js

const Task = require('../models/task');
const { body, validationResult } = require('express-validator');

// Crie um objeto vazio para armazenar as funções do controlador
const taskController = {};

// Função para criar uma nova tarefa
taskController.createTask = async (req, res) => {
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
}

// Função para listar todas as tarefas
taskController.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); // Busque todas as tarefas no banco de dados
        res.json(tasks); // Responda com a lista de tarefas
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para buscar uma tarefa por ID
taskController.getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId); // Busque a tarefa pelo ID
        if (!task) {
            const error = new Error("Tarefa não encontrada")
            error.statusCode = 404
            throw error
        }
        res.json(task); // Responda com a tarefa encontrada
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para atualizar uma tarefa por ID
taskController.updateTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body; // Dados de atualização da tarefa
        const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!task) {
            const error = new Error('Tarefa não encontrada')
            error.statusCode = 404
            throw error
        }
        res.json(task); // Responda com a tarefa atualizada
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Função para excluir uma tarefa por ID
taskController.deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndRemove(taskId);
        if (!task) {
            const error = new Error('Tarefa não encontrada')
            error.statusCode = 404
            throw error
        }
        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = taskController;
