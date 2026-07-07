import { useState, useRef, useEffect } from "react";

import { useProducts } from "../../context/ProductContext";

import { ProductCard } from "../ProductCard/ProductCard";

import "./Searchbar.css";

interface SearchbarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Searchbar({ isOpen, onClose }: SearchbarProps) {
    const { products } = useProducts();

    const [searchQuery, setSearchQuery] = useState<string>("");

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredProducts = products
        ? products.filter((product) =>
            product?.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <>
            <div className="searchbar-backdrop" onClick={onClose}></div>

            <section className="searchbar">
                <div className="container">
                    <input
                        className="searchbar__input"
                        ref={inputRef}
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {searchQuery && (
                        filteredProducts.length > 0 ? (
                            <div className="search__results">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="searchbar__no-results"> No products found</div>
                        )
                    )}
                </div>
            </section>
        </>
    );
}