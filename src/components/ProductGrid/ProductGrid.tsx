import { useProducts } from "../../context/ProductContext";

import { ProductCard } from "../ProductCard/ProductCard";

import type { Product } from "../../types";

import './ProductGrid.css';

interface ProductGridProps {
    products?: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const { products: contextProducts, isLoading, error } = useProducts();

    const displayProducts = products || contextProducts;

    if (isLoading) {
        return (
            <section className="products">
                <div className="container">
                    <div className="products__loading"> Loading of goods ...</div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="products">
                <div className="container">
                    <div className="products__error">Error: {error}</div>
                </div>
            </section>
        )
    }

    if (!displayProducts || displayProducts.length === 0) {
        return (
            <section className="products">
                <div className="container">
                    <div className="products__loading">Products were not found !</div>
                </div>
            </section>
        )
    }

    return (
        <section className="products">
            <div className="container">
                <div className="products__list">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
