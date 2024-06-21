import express from 'express';
import { PrismaClient } from '@prisma/client';
import productsRouter from './routes/products';
import categoriesRouter from './routes/categories';
import cartRouter from './routes/cart';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/cart', cartRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
