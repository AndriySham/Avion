import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/api";

import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useWishlist } from "../context/WishlistContext";

import { Advantages } from "../components/Advantages/Advantages";
import { Benefits } from "../components/Benefits/Benefits";
import { ProductCard } from "../components/ProductCard/ProductCard";

import type { Product } from "../types";

import "./ProductDetail.css";

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const { products } = useProducts();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState<Product | null>(null);
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            setIsLoading(true);
            setError(null);

            if (id) {
                const result = await getProductById(Number(id));
                if (result === null) {
                    setError("Product not found");
                } else {
                    setProduct(result);
                }
            } else {
                setError("Id is not correct");
            }

            setIsLoading(false);
        };

        loadProduct();
    }, [id]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error || !product) {
        return (
            <div>Error: {error}</div>
        );
    }

    const quantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value, 10);
        if (!isNaN(val) && val >= 1) {
            setProductQuantity(val);
        }
    }

    const quantityDecrement = () => {
        setProductQuantity(prev => Math.max(1, prev - 1));
    }

    const quantityIncrement = () => {
        setProductQuantity(prev => prev + 1);
    }

    return (
        <>
            <div className="product-detail">
                <div className="container">
                    <div className="product-detail__content">
                        <div className="product-detail__image">
                            <img src={product.thumbnail} alt={product.title} />
                        </div>
                        <div className="product-detail__info">
                            <h2 className="product-detail__title">{product.title}</h2>
                            <p className="product-detail__price">&#163; {product.price}</p>
                            <h3 className="product-detail__subtitle">Product description</h3>
                            <p className="product-detail__description">{product.description}</p>
                            <h3 className="product-detail__subtitle">Dimensions</h3>
                            <div className="product-detail__dimensions">
                                <div className="product-detail__dimensions-item">
                                    <span className="product-detail__dimensions-item__label">height</span>
                                    <span className="product-detail__dimensions-item__value">{product.dimensions?.height}</span>
                                </div>
                                <div className="product-detail__dimensions-item">
                                    <span className="product-detail__dimensions-item__label">width</span>
                                    <span className="product-detail__dimenssons-item__value">{product.dimensions?.width}</span>
                                </div>
                                <div className="product-detail__dimensions-item">
                                    <span className="product-detail__dimensions-item__label">depth</span>
                                    <span className="product-detail__dimensions-item__value">{product.dimensions?.depth}</span>
                                </div>
                            </div>
                            <p className="product-detail__quantity">Quantity</p>
                            <div className="product-detail__counter">
                                <input
                                    className="product-detail__quantity__minus"
                                    type="button"
                                    value="-"
                                    onClick={quantityDecrement}
                                />
                                <input
                                    className="product-detail__quantity__input"
                                    type="number"
                                    value={productQuantity}
                                    onChange={quantityChange}
                                />
                                <input
                                    className="product-detail__quantity__plus"
                                    type="button"
                                    value="+"
                                    onClick={quantityIncrement}
                                />
                            </div>
                            <div className="product-detail__button-wrapper">
                                <button 
                                    className="btn btn-white"
                                    onClick={() => toggleWishlist(product)}
                                >
                                    {isInWishlist(product.id) ? "Remove from favorites" : "Save to favorites"}
                                </button>
                                <button className="btn btn-dark-blue" onClick={() => addToCart(product, productQuantity)}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="related-products">
                <div className="container">
                    <h2 className="related-products__title">You might also like</h2>

                    <div className="related-products__grid">
                        {products?.slice(0, 4).map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>

                    <button className="btn btn-white related-products__btn">View collection</button>
                </div>
            </section>

            <Advantages />

            <Benefits />
        </>
    )
}