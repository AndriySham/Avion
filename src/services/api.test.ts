import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getProducts, getProductsByCategory, getProductById, login } from './api';
import type { Product, User } from '../types';

// Mock fixtures
const mockFurnitureProduct: Product = {
    id: 1,
    title: 'Comfortable Sofa',
    description: 'A stylish and comfortable sofa.',
    category: 'furniture',
    price: 499.99,
    thumbnail: 'https://dummyjson.com/images/sofa.jpg',
    images: ['https://dummyjson.com/images/sofa.jpg'],
};

const mockHomeDecoProduct: Product = {
    id: 2,
    title: 'Ceramic Vase',
    description: 'Beautiful vase for living room.',
    category: 'home-decoration',
    price: 29.99,
    thumbnail: 'https://dummyjson.com/images/vase.jpg',
    images: ['https://dummyjson.com/images/vase.jpg'],
};

const mockKitchenProduct: Product = {
    id: 3,
    title: 'Chef Knife',
    description: 'Professional stainless steel knife.',
    category: 'kitchen-accessories',
    price: 89.99,
    thumbnail: 'https://dummyjson.com/images/knife.jpg',
    images: ['https://dummyjson.com/images/knife.jpg'],
};

const mockUser: User = {
    id: 10,
    username: 'kminchelle',
    firstName: 'Jeanne',
    lastName: 'Halvorson',
    email: 'kminchelle@qq.com',
    image: 'https://dummyjson.com/icon/kminchelle/128',
    token: 'mocked-jwt-token-12345',
};

describe('API Service (`src/services/api.ts`)', () => {
    let mockFetch: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockFetch = vi.fn();
        vi.stubGlobal('fetch', mockFetch);
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    describe('getProductsByCategory', () => {
        it('should fetch and return products array for a valid category', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ products: [mockFurnitureProduct] }),
            });

            const result = await getProductsByCategory('furniture');

            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/furniture');
            expect(result).toEqual([mockFurnitureProduct]);
        });

        it('should trim whitespace and URL-encode special characters in category', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ products: [mockKitchenProduct] }),
            });

            const result = await getProductsByCategory('  kitchen accessories  ');

            expect(mockFetch).toHaveBeenCalledWith(
                'https://dummyjson.com/products/category/kitchen%20accessories'
            );
            expect(result).toEqual([mockKitchenProduct]);
        });

        it('should return null and log error when HTTP response status is not ok (e.g., 404)', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            const result = await getProductsByCategory('non-existent');

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(
                'getProductByCategory (non-existent) Error:',
                expect.any(Error)
            );
        });

        it('should return null and log error when network request fails', async () => {
            const networkError = new Error('Failed to fetch');
            mockFetch.mockRejectedValueOnce(networkError);

            const result = await getProductsByCategory('furniture');

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(
                'getProductByCategory (furniture) Error:',
                networkError
            );
        });

        it('should return null and log error when response JSON parsing fails', async () => {
            const jsonError = new SyntaxError('Unexpected token < in JSON');
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => {
                    throw jsonError;
                },
            });

            const result = await getProductsByCategory('furniture');

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(
                'getProductByCategory (furniture) Error:',
                jsonError
            );
        });

        it('should construct correct URL when given an empty category string', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ products: [] }),
            });

            const result = await getProductsByCategory('');

            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/');
            expect(result).toEqual([]);
        });
    });

    describe('getProducts', () => {
        it('should fetch all default categories in parallel and return merged products list', async () => {
            mockFetch.mockImplementation(async (url: string) => {
                if (url.includes('/category/furniture')) {
                    return { ok: true, json: async () => ({ products: [mockFurnitureProduct] }) };
                }
                if (url.includes('/category/home-decoration')) {
                    return { ok: true, json: async () => ({ products: [mockHomeDecoProduct] }) };
                }
                if (url.includes('/category/kitchen-accessories')) {
                    return { ok: true, json: async () => ({ products: [mockKitchenProduct] }) };
                }
                return { ok: false, status: 404 };
            });

            const result = await getProducts();

            expect(mockFetch).toHaveBeenCalledTimes(3);
            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/furniture');
            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/home-decoration');
            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/kitchen-accessories');
            expect(result).toEqual([mockFurnitureProduct, mockHomeDecoProduct, mockKitchenProduct]);
        });

        it('should return partial merged list when some categories fail', async () => {
            mockFetch.mockImplementation(async (url: string) => {
                if (url.includes('/category/furniture')) {
                    return { ok: true, json: async () => ({ products: [mockFurnitureProduct] }) };
                }
                if (url.includes('/category/home-decoration')) {
                    return { ok: false, status: 500 };
                }
                if (url.includes('/category/kitchen-accessories')) {
                    return { ok: true, json: async () => ({ products: [mockKitchenProduct] }) };
                }
                return { ok: false, status: 404 };
            });

            const result = await getProducts();

            expect(result).toEqual([mockFurnitureProduct, mockKitchenProduct]);
        });

        it('should return null when all category requests fail', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 500,
            });

            const result = await getProducts();

            expect(result).toBeNull();
        });

        it('should return null when all categories return empty product lists', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({ products: [] }),
            });

            const result = await getProducts();

            expect(result).toBeNull();
        });
    });

    describe('getProductById', () => {
        it('should fetch and return product object when given a valid ID', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockFurnitureProduct,
            });

            const result = await getProductById(1);

            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/1');
            expect(result).toEqual(mockFurnitureProduct);
        });

        it('should return null and log error when product ID is not found (404 status)', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            const result = await getProductById(999);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith('getProductById (999) Error:', expect.any(Error));
        });

        it('should return null and log error on HTTP 500 server error', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
            });

            const result = await getProductById(1);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith('getProductById (1) Error:', expect.any(Error));
        });

        it('should return null and log error when network request rejects', async () => {
            const networkError = new Error('Network failure');
            mockFetch.mockRejectedValueOnce(networkError);

            const result = await getProductById(1);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith('getProductById (1) Error:', networkError);
        });

        it('should construct correct URL and handle boundary ID values (e.g., 0)', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            const result = await getProductById(0);

            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/0');
            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should send POST request with JSON payload and return User object on success', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const result = await login('kminchelle', '0lelous');

            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'kminchelle',
                    password: '0lelous',
                    expiresInMins: 60,
                }),
            });
            expect(result).toEqual(mockUser);
        });

        it('should return null and log authentication error on invalid credentials (400/401 status)', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
            });

            const result = await login('invalidUser', 'wrongPass');

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith('Authentication request failed');
        });

        it('should return null and log error when network request rejects', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Connection refused'));

            const result = await login('kminchelle', '0lelous');

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith('Authentication request failed');
        });

        it('should handle empty username and password strings', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
            });

            const result = await login('', '');

            expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: '',
                    password: '',
                    expiresInMins: 60,
                }),
            });
            expect(result).toBeNull();
        });
    });
});
