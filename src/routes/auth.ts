import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config';

const router = Router();
const prisma = new PrismaClient();

// Registrar usuário
router.post('/register', async (req, res) => {
    const { email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
        const user = await prisma.usuario.create({
            data: {
                email,
                senha: hashedPassword,
            },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Autenticar usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await prisma.usuario.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
        });

        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
