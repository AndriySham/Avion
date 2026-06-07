export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
    images: string[];
    dimensions?: ProductDimensions;
}

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    token: string;
}
