const mongoose = require('mongoose');

// Defina o esquema do modelo de tarefa
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // O título é obrigatório
    },
    description: {
        type: String,
        default: '', // A descrição é opcional, com valor padrão vazio
    },
    completed: {
        type: Boolean,
        default: false, // Por padrão, a tarefa não está concluída
    },
    createdAt: {
        type: Date,
        default: Date.now, // A data de criação é preenchida automaticamente com a data atual
    },
});

// Crie o modelo de tarefa com base no esquema
const Task = mongoose.model('Task', taskSchema);

// Exporte o modelo para que ele possa ser usado em outras partes do seu aplicativo
module.exports = Task;
