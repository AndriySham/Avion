import "./Benefits.css";

export function Benefits() {
    return (
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
    )
}