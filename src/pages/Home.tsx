import { Van, Check, CreditCard, Sprout } from "lucide-react";

import "./Home.css";

export function Home() {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero__content">
                        <div className="hero__column">
                            <h1 className="hero__title">The furniture brand for the future, which timeless designs</h1>
                            <div className="hero__text">A new era in eco friendly furniture with Avelon, the French luxury retail brand with nice fonts, tasteful colors and a befutiful way to display things digitally using modern new technologies.</div>
                            <button className="btn btn--blue">View collection</button>
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
        </>
    )
}