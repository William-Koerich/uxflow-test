import express from 'express';
import { PrismaClient } from '@prisma/client';
import productsRouter from './routes/products';
import categoriesRouter from './routes/categories';
import cartRouter from './routes/cart';
import authRouter from './routes/auth';
import { authenticateJWT } from './middleware/auth';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', authenticateJWT, productsRouter);
app.use('/categories', authenticateJWT, categoriesRouter);
app.use('/cart', authenticateJWT, cartRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
