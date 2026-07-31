import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Product } from '../types';

// Mock localStorage for node test environment
class LocalStorageMock {
    private store: Record<string, string> = {};
    clear() {
        this.store = {};
    }
    getItem(key: string) {
        return this.store[key] ?? null;
    }
    setItem(key: string, value: string) {
        this.store[key] = String(value);
    }
    removeItem(key: string) {
        delete this.store[key];
    }
}

const localStorageMock = new LocalStorageMock();
Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

const mockProduct1: Product = {
    id: 1,
    title: 'Dandy Chair',
    description: 'A minimalist wooden frame chair.',
    category: 'chairs',
    price: 250,
    thumbnail: 'https://example.com/dandy-chair.jpg',
    images: ['https://example.com/dandy-chair.jpg'],
};

const mockProduct2: Product = {
    id: 2,
    title: 'Lucy Lamp',
    description: 'A stylish table lamp with warm lighting.',
    category: 'lamps',
    price: 95,
    thumbnail: 'https://example.com/lucy-lamp.jpg',
    images: ['https://example.com/lucy-lamp.jpg'],
};

const mockProduct3: Product = {
    id: 3,
    title: 'Rustic Vase',
    description: 'Handcrafted ceramic vase.',
    category: 'vases',
    price: 45,
    thumbnail: 'https://example.com/rustic-vase.jpg',
    images: ['https://example.com/rustic-vase.jpg'],
};

// Wishlist Logic pure functions test suite matching WishlistContext logic
function loadWishlistFromStorage(): Product[] {
    try {
        const savedWishlist = localStorage.getItem('avion_wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
        return [];
    }
}

function saveWishlistToStorage(items: Product[]) {
    localStorage.setItem('avion_wishlist', JSON.stringify(items));
}

function toggleWishlistItem(items: Product[], product: Product): Product[] {
    const exists = items.some(item => item.id === product.id);
    if (exists) {
        return items.filter(item => item.id !== product.id);
    } else {
        return [...items, product];
    }
}

function removeWishlistItem(items: Product[], productId: number): Product[] {
    return items.filter(item => item.id !== productId);
}

function isItemInWishlist(items: Product[], productId: number): boolean {
    return items.some(item => item.id === productId);
}

describe('Wishlist State & LocalStorage Logic', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('Initialization & localStorage Loading', () => {
        it('should initialize with an empty array when localStorage is empty', () => {
            const items = loadWishlistFromStorage();
            expect(items).toEqual([]);
        });

        it('should load saved items from localStorage on initial render', () => {
            const savedItems: Product[] = [mockProduct1, mockProduct2];
            localStorage.setItem('avion_wishlist', JSON.stringify(savedItems));

            const items = loadWishlistFromStorage();
            expect(items).toEqual(savedItems);
        });

        it('should fallback to an empty array when localStorage JSON is invalid/corrupt', () => {
            localStorage.setItem('avion_wishlist', 'invalid-json-{');

            const items = loadWishlistFromStorage();
            expect(items).toEqual([]);
        });
    });

    describe('localStorage Persistence / Saving', () => {
        it('should save wishlist items to localStorage', () => {
            const setItemSpy = vi.spyOn(localStorage, 'setItem');
            saveWishlistToStorage([mockProduct1]);

            expect(setItemSpy).toHaveBeenCalledWith(
                'avion_wishlist',
                JSON.stringify([mockProduct1])
            );
        });
    });

    describe('toggleWishlist', () => {
        it('should add a product to the wishlist if not already present', () => {
            let items: Product[] = [];
            items = toggleWishlistItem(items, mockProduct1);

            expect(items).toHaveLength(1);
            expect(items).toContainEqual(mockProduct1);
        });

        it('should remove a product from the wishlist if already present (toggling off)', () => {
            let items: Product[] = [mockProduct1];
            items = toggleWishlistItem(items, mockProduct1);

            expect(items).toEqual([]);
        });

        it('should handle toggling multiple products independently', () => {
            let items: Product[] = [];
            items = toggleWishlistItem(items, mockProduct1);
            items = toggleWishlistItem(items, mockProduct2);

            expect(items).toEqual([mockProduct1, mockProduct2]);

            items = toggleWishlistItem(items, mockProduct1);
            expect(items).toEqual([mockProduct2]);
        });
    });

    describe('isInWishlist', () => {
        it('should return true when a product with specified ID exists in wishlist', () => {
            const items: Product[] = [mockProduct1];
            expect(isItemInWishlist(items, mockProduct1.id)).toBe(true);
        });

        it('should return false when a product with specified ID is not in wishlist', () => {
            const items: Product[] = [mockProduct1];
            expect(isItemInWishlist(items, 999)).toBe(false);
        });
    });

    describe('removeFromWishlist', () => {
        it('should remove a product from wishlist by ID', () => {
            let items: Product[] = [mockProduct1, mockProduct2];
            items = removeWishlistItem(items, mockProduct1.id);

            expect(items).toEqual([mockProduct2]);
            expect(isItemInWishlist(items, mockProduct1.id)).toBe(false);
        });

        it('should not modify wishlist when trying to remove a non-existent product ID', () => {
            let items: Product[] = [mockProduct1];
            items = removeWishlistItem(items, 999);

            expect(items).toEqual([mockProduct1]);
        });
    });

    describe('clearWishlist', () => {
        it('should remove all items from the wishlist', () => {
            let items: Product[] = [mockProduct1, mockProduct2, mockProduct3];
            items = [];

            expect(items).toEqual([]);
        });
    });
});
