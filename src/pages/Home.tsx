import { useState, useEffect } from "react";

import { getProductsByCategory } from "../services/api";
import { useProducts } from "../context/ProductContext";
import { Advantages } from "../components/Advantages/Advantages";
import { ProductCard } from "../components/ProductCard/ProductCard";

import type { Product } from "../types";

import storyImage from "../assets/storyImage.png";

import "./Home.css";
import { Benefits } from "../components/Benefits/Benefits";

export function Home() {
    const {
        products, isLoading: isProductsLoading,
        error: productsError
    } = useProducts();

    const [ceramic, setCeramics] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHomeDecoration = async () => {
            const result = await getProductsByCategory('home-decoration');

            if (result === null) {
                setIsLoading(false);
                setError("Failed to load ceramics");
                return;
            }

            const foreProduct = result.slice(0, 4);

            setIsLoading(false);
            setCeramics(foreProduct);
        };

        loadHomeDecoration();
    }, []);

    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero__content">
                        <div className="hero__column">
                            <h1 className="hero__title">The furniture brand for the future, with timeless designs</h1>
                            <div className="hero__text">A new era in eco friendly furniture with Avion, the French luxury retail brand with nice fonts, tasteful colors and a beautiful way to display things digitally using modern new technologies.</div>
                            <button className="btn btn-light-blue hero__btn">View collection</button>
                        </div>
                        <div className="hero__image">
                            <img src="#" alt="furniture" />
                        </div>
                    </div>
                </div>
            </section>

            <Advantages />

            <section className="home-decoration">
                <div className="container">
                    <h2 className="home-decoration__title">Home decoration</h2>

                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : (
                        <div className="home-decoration__list">
                            {ceramic.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    )}

                    <button className="btn home-decoration__btn">View collection</button>

                </div>
            </section>

            <section className="popular-products">
                <div className="container">
                    <h2 className="popular-products__title">Our popular products</h2>
                </div>

                {isProductsLoading ? (
                    <div>Loading...</div>
                ) : productsError ? (
                    <div className="error">{productsError}</div>
                ) : (
                    <div className="popular-products__slider">
                        {products?.slice(0, 4).map((product) => (
                            <div key={product.id} className="popular-product__item">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
                <div className="container">
                    <button className="btn popular-prodcts__btn">View all products</button>
                </div>
            </section>

            <Benefits />

            <section className="global-brand">
                <div className="global-brand__row">
                    <div className="global-brand__content">
                        <h2 className="global-brand__title">From a studio in London to a global brand with <br /> over 400 outlets</h2>
                        <div className="global-brand__advantages">
                            <p className="global-brand__text">When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.</p>
                            <p className="global-brand__text">Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>
                        </div>
                        <button className="btn global-brand__btn">Get in touch</button>
                    </div>
                    <div className="global-brand__image">
                        <img src={storyImage} alt="global brand" />
                    </div>
                </div>
            </section>
        </>
    )
}