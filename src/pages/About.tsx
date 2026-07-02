import { Advantages } from "../components/Advantages/Advantages";
import { Benefits } from "../components/Benefits/Benefits";

import "./About.css";

export function About() {
    return (
        <>
            <nav className="nav">
                <div className="nav__items">
                    <button className="nav__item">
                        All products
                    </button>
                    <button className="nav__item">
                        Furniture
                    </button>
                    <button className="nav__item">
                        Home Decorations
                    </button>
                    <button className="nav__item">
                        Cosmetics
                    </button>
                </div>
            </nav>

            <section className="about-hero">
                <div className="container">
                    <div className="about-hero__content">
                        <h1 className="about-hero__title">A brand built on the love of craftmanship, quality and outstanding customer service</h1>
                        <button className="btn about-hero__btn">View our products</button>
                    </div>
                </div>
            </section>

            <Advantages />

            <Benefits />
        </>
    )
}