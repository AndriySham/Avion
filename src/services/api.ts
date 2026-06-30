import type { Product, User } from "../types";

const BASE_URL = 'https://dummyjson.com';

export async function getProductsByCategoryId(category: string): Promise<Product[] | null> {
    try {

        const response = await fetch(`${BASE_URL}/products/category/${category}`);

        if (!response.ok) {
            throw new Error('Error of products laoding');
        }

        const data = await response.json();

        return data.products;

    } catch (error) {
        console.error('getProducts Error:', error);

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
        console.error('login Error:', error);

        return null;
    }
}