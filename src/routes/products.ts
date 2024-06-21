import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Criar Produto
router.post('/', async (req, res) => {
    const { nome, descricao, preco, categoriaId } = req.body;
    try {
        const produto = await prisma.produto.create({
            data: {
                nome,
                descricao,
                preco,
                categoriaId,
            },
        });
        res.json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar Produtos com Filtros
router.get('/', async (req, res) => {
    const { categoriaId, precoMin, precoMax } = req.query;
    try {
        const produtos = await prisma.produto.findMany({
            where: {
                categoriaId: categoriaId ? Number(categoriaId) : undefined,
                preco: {
                    gte: precoMin ? Number(precoMin) : undefined,
                    lte: precoMax ? Number(precoMax) : undefined,
                },
            },
        });
        res.json(produtos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Detalhar Produto
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await prisma.produto.findUnique({
            where: { id: Number(id) },
        });
        res.json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Atualizar Produto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, categoriaId } = req.body;
    try {
        const produto = await prisma.produto.update({
            where: { id: Number(id) },
            data: { nome, descricao, preco, categoriaId },
        });
        res.json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Excluir Produto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.produto.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
