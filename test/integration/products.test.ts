import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let token: string;

beforeAll(async () => {
    await prisma.categoria.create({
        data: {
            nome: 'Categoria Teste',
        },
    });

    await prisma.usuario.deleteMany();
    const res = await request(app)
        .post('/auth/register')
        .send({
            email: 'user@example.com',
            senha: 'password123',
        });

    token = (await request(app)
        .post('/auth/login')
        .send({
            email: 'user@example.com',
            senha: 'password123',
        })).body.token;
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('Products Endpoints', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Produto Teste',
                descricao: 'Descrição do produto teste',
                preco: 100,
                categoriaId: 1,
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should list all products', async () => {
        const res = await request(app)
            .get('/products')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
