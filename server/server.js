const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session'); // Importe o módulo de sessão

// Importe os roteadores e middlewares necessários
const taskRoutes = require('./app/routes/taskRoutes');
const userRoutes = require('./app/routes/userRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

// Crie uma instância do servidor Express
const app = express();

// Carregue as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Conecte-se ao MongoDB usando a variável de ambiente CONNECTIONSTRING
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

// Configuração do EJS como engine de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração da sessão
app.use(
    session({
        secret: process.env.SECRET_KEY, // Substitua por uma chave secreta real
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Configuração do cookie (ajuste conforme necessário)
    })
);

// Configurar middlewares para processamento de corpo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defina uma rota de teste
app.get('/', (req, res) => {
    res.send('Servidor Node.js com Express.js está funcionando!');
});

// Use os roteadores
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Rota 404
app.use((req, res) => {
    res.status(404).render('404'); // Renderiza a página 404.ejs
});

// Escolha a porta em que o servidor irá escutar (por exemplo, porta 3000)
const port = process.env.PORT || 3000;

// Inicie o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
