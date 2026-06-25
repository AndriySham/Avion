import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

import type { Product, CartItem } from "../types";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem('avion_cart');
            return savedCart ? JSON.parse(savedCart) : []
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('avion_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product, quantity: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { product, quantity }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }} >
            {children}
        </CartContext>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw Error('useCart must be used with CartProvider');
    }
    return context;
}