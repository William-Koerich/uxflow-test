export const calculateTotal = (items: { preco: number, quantidade: number }[]): number => {
    return items.reduce((total, item) => total + item.preco * item.quantidade, 0);
};