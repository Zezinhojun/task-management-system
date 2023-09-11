// UserController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const userController = {}

// Registrar um novo usuário
userController.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ username });

        // Usar express-validator para adicionar verificações de validação personalizadas
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criptografar a senha antes de armazená-la no banco de dados
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

userController.validateUserRegistration = [
    body('username')
        .notEmpty().withMessage('O nome de usuário não pode estar vazio')
        .isLength({ min: 3, max: 15 }).withMessage('O nome de usuário deve ter entre 3 e 15 caracteres'),

    body('password')
        .isLength({ min: 3, max: 15 }).withMessage('A senha deve ter entre 3 e 15 caracteres'),
];

// Login de usuário
userController.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar se o usuário existe
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Verificar a senha
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gerar um token JWT para autenticação
        const token = jwt.sign({ id: user._id }, 'seuSegredoAqui', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = userController