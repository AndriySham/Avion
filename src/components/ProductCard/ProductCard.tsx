import "./ProductCard.css";

export function ProductCard(product) {
    return (
        <div className='product-card'>
            <div className="product-card__image">
                <img src={product.thumbnail} alt={product.title}></img>
            </div>
            <h3 className="product-card__title">{product.title}</h3>
            <p className="product-card__price">$ {product.price}</p>
        </div>
    )
}