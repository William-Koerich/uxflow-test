import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Criar Categoria
router.post('/', async (req, res) => {
    const { nome } = req.body;
    try {
        const categoria = await prisma.categoria.create({
            data: { nome },
        });
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar Categorias
router.get('/', async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        res.json(categorias);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Detalhar Categoria
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await prisma.categoria.findUnique({
            where: { id: Number(id) },
        });
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Atualizar Categoria
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const categoria = await prisma.categoria.update({
            where: { id: Number(id) },
            data: { nome },
        });
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Excluir Categoria
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.categoria.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
