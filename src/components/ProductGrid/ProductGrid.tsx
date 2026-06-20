import { ProductCard } from "../ProductCard/ProductCard";

import { useProducts } from "../../context/ProductContext";

import './ProductGrid.css';


export function ProductGrid() {
    const { products, isLoading, error } = useProducts();

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

    if (!products || products.length === 0) {
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
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
