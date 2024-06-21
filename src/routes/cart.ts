import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Adicionar ao Carrinho
router.post('/', async (req, res) => {
    const { produtoId, carrinhoId, quantidade } = req.body;
    try {
        const carrinhoProduto = await prisma.carrinhoProduto.create({
            data: {
                produtoId,
                carrinhoId,
                quantidade,
            },
        });
        res.json(carrinhoProduto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Remover do Carrinho
router.delete('/', async (req, res) => {
    const { produtoId, carrinhoId } = req.body;
    try {
        await prisma.carrinhoProduto.delete({
            where: {
                produtoId_carrinhoId: {
                    produtoId,
                    carrinhoId,
                },
            },
        });
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Visualizar Carrinho
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const carrinho = await prisma.carrinho.findUnique({
            where: { id: Number(id) },
            include: {
                produtos: {
                    include: {
                        produto: true,
                    },
                },
            },
        });
        res.json(carrinho);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Checkout
router.post('/checkout', async (req, res) => {
    const { carrinhoId } = req.body;
    try {
        // Aqui você pode adicionar a lógica de checkout, como registrar a compra em uma tabela de pedidos
        const carrinho = await prisma.carrinho.findUnique({
            where: { id: Number(carrinhoId) },
            include: {
                produtos: {
                    include: {
                        produto: true,
                    },
                },
            },
        });

        // Registrar a compra (aqui simplificado, você pode criar uma tabela de pedidos, etc.)
        console.log('Compra finalizada:', carrinho);

        // Limpar o carrinho
        await prisma.carrinhoProduto.deleteMany({
            where: { carrinhoId: Number(carrinhoId) },
        });

        res.json({ message: 'Compra finalizada com sucesso', carrinho });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
