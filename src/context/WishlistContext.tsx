import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "../types";

interface WishlistContextType {
    wishlistItems: Product[];
    toggleWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
        try {
            const savedWishlist = localStorage.getItem('avion_wishlist');
            return savedWishlist ? JSON.parse(savedWishlist) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('avion_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const toggleWishlist = (product: Product) => {
        setWishlistItems(prevItems => {
            const exists = prevItems.some(item => item.id === product.id);
            if (exists) {
                return prevItems.filter(item => item.id !== product.id);
            } else {
                return [...prevItems, product];
            }
        });
    };

    const removeFromWishlist = (productId: number) => {
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId: number): boolean => {
        return wishlistItems.some(item => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    return (
        <WishlistContext value={{ wishlistItems, toggleWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);

    if (context === undefined) {
        throw Error('useWishlist must be used with WishlistProvider');
    }
    return context;
}
