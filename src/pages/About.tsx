import { Advantages } from "../components/Advantages/Advantages";
import { Benefits } from "../components/Benefits/Benefits";

import Armchair from "../assets/About_yellow_armchair.png";
import Chair from "../assets/About_cocoa_sofa.png";

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

            <section className="service">
                <div className="container">
                    <div className="service__content">
                        <div className="service__image">
                            <img src={Chair} alt="chair" />
                        </div>
                        <div className="service__info">
                            <h2 className="service__title">Our service isn’t just personal, it’s actually hyper personally exquisite</h2>
                            <div className="service__text">
                                <p className="service__text-item">When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.</p>
                                <p className="service__text-item">Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>
                            </div>
                            <button className="btn btn-white service__btn">Get in touch</button>
                        </div>
                    </div>
                </div>
            </section>

            <Advantages />

            <Benefits />
        </>
    )
}