import { useState, useEffect } from "react";

import { Van, Check, CreditCard, Sprout } from "lucide-react";

import { getProductsByCategory } from "../services/api";
import { useProducts } from "../context/ProductContext";
import { ProductCard } from "../components/ProductCard/ProductCard";

import type { Product } from "../types";

import storyImage from "../assets/storyImage.png";

import "./Home.css";

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
                            <button className="btn btn--blue hero__btn">View collection</button>
                        </div>
                        <div className="hero__image">
                            <img src="#" alt="furniture" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="advantages">
                <div className="container">
                    <h2 className="advantages__title">What makes our brand different</h2>
                    <div className="advantages__grid">
                        <div className="advantages__item">
                            <div className="advantages__icon">
                                <Van size={18} />
                            </div>
                            <h3 className="advantages__item-title">Next day as standard</h3>
                            <p className="advantages__item-text">Order before 3pm and get your order the next day as standard</p>
                        </div>

                        <div className="advantages__item">
                            <div className="advantages__icon">
                                <Check size={18} />
                            </div>
                            <h3 className="advantages__item-title">Made by true artisans</h3>
                            <p className="advantages__item-text">Handmade crafted goods made with real passion and craftmanship</p>
                        </div>

                        <div className="advantages__item">
                            <div className="advantages__icon">
                                <CreditCard size={18} />
                            </div>
                            <h3 className="advantages__item-title">Unbeatable prices</h3>
                            <p className="advantages__item-text">For our materials and quality you won’t find better prices anywhere</p>
                        </div>

                        <div className="advantages__item">
                            <div className="advantages__icon">
                                <Sprout size={18} />
                            </div>
                            <h3 className="advantages__item-title">Recycled packaging</h3>
                            <p className="advantages__item-text">We use 100% recycled packaging to ensure our footprint is manageable</p>
                        </div>
                    </div>
                </div>
            </section>

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

            <section className="benefits">
                <div className="container">
                    <h2 className="benefits__title">Join the club and get the benefits</h2>
                    <p className="benefits__text">Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>

                    <div className="newsletter-form newsletter-form--light">
                        <input type="email" placeholder="your@email.com" className="newsletter-form__input" />
                        <button className=" btn newsletter-form__button">Sign up</button>
                    </div>
                </div>
            </section>

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