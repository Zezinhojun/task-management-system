// Importe o módulo Express.js
const express = require('express');
const taskRoutes = require('./app/routes/taskRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Importe o pacote dotenv
// Carregue as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Conecte-se ao MongoDB usando a variável de ambiente CONNECTIONSTRING
console.log('CONNECTIONSTRING:', process.env.CONNECTIONSTRING);

mongoose
    .connect(process.env.CONNECTIONSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Conexão com o MongoDB Atlas estabelecida com sucesso');
        app.emit('pronto');
    })
    .catch((e) => {
        console.error('Erro ao conectar ao MongoDB Atlas:', e);
    });

// Crie uma instância do servidor Express
const app = express();

// Defina uma rota de teste
app.get('/', (req, res) => {
    res.send('Servidor Node.js com Express.js está funcionando!');
});

app.use('/api', taskRoutes);

// Escolha a porta em que o servidor irá escutar (por exemplo, porta 3000)
const port = process.env.PORT || 3000;

// Inicie o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});