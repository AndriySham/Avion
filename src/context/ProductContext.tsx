import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "../types";
import { getProducts } from "../services/api";

export interface ProductsContextType {
    products: Product[] | null;
    isLoading: boolean;
    error: string | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const loadProducts = async () => {
            const result = await getProducts();

            if (result === null) {
                setError("Failed to load products");
                setIsLoading(false);
                return;
            }

            setProducts(result);
            setIsLoading(false);
        };

        loadProducts();
    }, []);

    return (
        <ProductsContext value={{ products, isLoading, error }}>
            {children}
        </ProductsContext>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);

    if (context === undefined) {
        throw new Error('useProducts must be used within ProductsProvider');
    }

    return context;
}
