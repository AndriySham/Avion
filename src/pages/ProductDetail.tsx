import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/api";
import type { Product } from "../types";

import "./ProductDetail.css";

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [productQuantity, setProductQuantity] = useState<number>(0);
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
        setProductQuantity(Number(event.target.value));
    }

    const quantityDecrement = () => {
        setProductQuantity(productQuantity - 1);
    }

    const quantityIncrement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(productQuantity + 1);
    }

    return (
        <div className="product-detail">
            <div className="container">
                <div className="product-detail__content">
                    <div className="product-detail__image">
                        <img src={product.thumbnail} />
                    </div>
                    <div className="product-detail__info">
                        <h2 className="product-detail__title">{product.title}</h2>
                        <p className="product-detail__price">&#163; {product.price}</p>
                        <p className="product-detail__subtitle line">Product description</p>
                        <p className="product-detail__description">{product.description}</p>
                        <p className="product-detail__subtitle line">Dimensions</p>
                        <div className="product-detail__dimensions">
                            <div className="product-detail__dimentions-item">
                                <span className="product-detail__dimentions-item__label">height</span>
                                <span className="product-detail__dimentions-item__value">{product.dimensions?.height}</span>
                            </div>
                            <div className="product-detail__dimentions-item">
                                <span className="product-detail__dimentions-item__label">width</span>
                                <span className="product-detail__dimentions-item__value">{product.dimensions?.width}</span>
                            </div>
                            <div className="product-detail__dimentions-item">
                                <span className="product-detail__dimentions-item__label">depth</span>
                                <span className="product-detail__dimentions-item__value">{product.dimensions?.depth}</span>
                            </div>
                        </div>
                        <p className="product-detail__quantity">Quantity</p>
                        <div className="product-detail__counter">
                            <input className="product-detail__quantity__minus" type="button" value="-" onChange={quantityDecrement} />
                            <input className="product-detail__quantity__input" type="number" value={productQuantity} onChange={quantityChange}></input>
                            <input className="product-detail__quantity__plus" type="button" value="+" onChange={quantityIncrement} />
                        </div>
                        <div className="product-detail__button-wrapper">
                            <button className="product-detail__button-save">Save to favorites</button>
                            <button className="product-detail__button-add">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}