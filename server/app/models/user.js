const mongoose = require('mongoose');

// Defina o esquema do modelo de usuário
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // O nome de usuário é obrigatório
    },
    password: {
        type: String,
        required: true, // A senha é obrigatória
    },
    createdAt: {
        type: Date,
        default: Date.now, // A data de criação é preenchida automaticamente com a data atual
    },
});

// Crie o modelo de usuário com base no esquema
const User = mongoose.model('User', userSchema);

// Exporte o modelo para que ele possa ser usado em outras partes do seu aplicativo
module.exports = User;
