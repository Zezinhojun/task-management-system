const request = require('supertest');
const app = require('../server'); // Importe seu aplicativo Express diretamente
const { mongoURI } = require("dotenv.test").config();; // Importe a string de conexão do MongoDB de testConfig.js


// ...

beforeAll(async () => {
    // Conecte-se ao MongoDB de teste antes de executar os testes
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

describe('Testes para as rotas de tarefas', () => {
    it('Deve retornar erro 400 ao criar uma tarefa sem título', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ description: 'Descrição da tarefa' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });

    it('Deve criar uma tarefa válida', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: 'Título da Tarefa', description: 'Descrição da tarefa' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'Título da Tarefa');
        expect(response.body).toHaveProperty('description', 'Descrição da tarefa');
    });
});

afterAll(async () => {
    // Desconecte-se do MongoDB após os testes
    await mongoose.disconnect();
});
