import { Link } from "react-router-dom";

import type { Product } from "../../types";

import "./ProductCard.css";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link to={`/product/${product.id}`} className='product-card'>
            <div className="product-card__image">
                <img src={product.thumbnail} alt={product.title}></img>
            </div>
            <h3 className="product-card__title">{product.title}</h3>
            <p className="product-card__price">$ {product.price}</p>
        </Link>
    )
}