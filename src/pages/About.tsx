import { Advantages } from "../components/Advantages/Advantages";
import { Benefits } from "../components/Benefits/Benefits";

import Armchair from "../assets/About_yellow_armchair.png";

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

            <section className="idea">
                <div className="container">
                    <div className="idea__content">
                        <div className="idea__info">
                            <h2 className="idea__title">It started with a small idea</h2>
                            <p className="idea__text">A global brand with local beginnings, our story begain in a small studio in South London in early 2014</p>
                            <button className="btn btn-light-blue idea__btn">View collection</button>
                        </div>
                        <div className="idea__image">
                            <img src={Armchair} alt="yellow armchair" />
                        </div>
                    </div>
                </div>
            </section>

            <Advantages />

            <Benefits />
        </>
    )
}