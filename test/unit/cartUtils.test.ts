// tests/unit/cartUtils.test.ts
import { calculateTotal } from '../../src/utils/cartUtils';

describe('calculateTotal', () => {
    it('should return 0 if no items are passed', () => {
        const items: { preco: number, quantidade: number }[] = [];
        expect(calculateTotal(items)).toBe(0);
    });

    it('should correctly calculate the total for multiple items', () => {
        const items = [
            { preco: 100, quantidade: 2 },
            { preco: 50, quantidade: 1 },
            { preco: 25, quantidade: 4 },
        ];
        expect(calculateTotal(items)).toBe(300);
    });

    it('should handle items with zero quantity', () => {
        const items = [
            { preco: 100, quantidade: 0 },
            { preco: 50, quantidade: 1 },
        ];
        expect(calculateTotal(items)).toBe(50);
    });

    it('should handle items with zero price', () => {
        const items = [
            { preco: 0, quantidade: 10 },
            { preco: 50, quantidade: 1 },
        ];
        expect(calculateTotal(items)).toBe(50);
    });
});
