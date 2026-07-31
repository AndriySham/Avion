import type { Product, User } from "../types";

const BASE_URL = 'https://dummyjson.com';

export async function getProducts(): Promise<Product[] | null> {
    const furniturePromise = getProductsByCategory('furniture');
    const homeDecorationPromise = getProductsByCategory('home-decoration');
    const kitchenPromise = getProductsByCategory('kitchen-accessories');

    const [furnitureList, homeDecoList, kitchenList] =
        await Promise.all([furniturePromise, homeDecorationPromise, kitchenPromise]);

    const merged: Product[] = [];
    if (furnitureList) {
        merged.push(...furnitureList);
    }
    if (homeDecoList) {
        merged.push(...homeDecoList);
    }
    if (kitchenList) {
        merged.push(...kitchenList);
    }

    return merged.length > 0 ? merged : null;
}

export async function getProductsByCategory(category: string): Promise<Product[] | null> {
    try {
        const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category.trim())}`);

        if (!response.ok) {
            throw new Error('Error of products loading');
        }

        const data = await response.json();

        return data.products;
    } catch (error) {
        console.error(`getProductByCategory (${category}) Error:`, error);

        return null;
    }
}

export async function getProductById(id: number): Promise<Product | null> {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);

        if (!response.ok) {
            throw new Error('Product did not found');
        }

        const data: Product = await response.json();

        return data;

    } catch (error) {
        console.error(`getProductById (${id}) Error:`, error);

        return null;
    }
}

export async function login(username: string, password: string): Promise<User | null> {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                expiresInMins: 60,
            }),
        });

        if (!response.ok) {
            throw new Error('Incorrect name or password');
        }

        const data: User = await response.json();

        return data;

    } catch (error) {
        console.error('Authentication request failed');

        return null;
    }
}