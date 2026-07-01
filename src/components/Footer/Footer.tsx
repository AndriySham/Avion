import "./Footer.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__items line">

                    <div className="footer__item">
                        <h3 className="footer__item-title">Categories</h3>
                        <ul className="footer__item-links">
                            <li><a href="#">Crockery</a></li>
                            <li><a href="#">Furniture</a></li>
                            <li><a href="#">Homeware</a></li>
                            <li><a href="#">Plant pots</a></li>
                            <li><a href="#">Chairs</a></li>
                            <li><a href="#">Crockery</a></li>
                        </ul>
                    </div>

                    <div className="footer__item">
                        <h3 className="footer__item-title">Menu</h3>
                        <ul className="footer__item-links">
                            <li><a href="#">New arrivals</a></li>
                            <li><a href="#">Best sellers</a></li>
                            <li><a href="#">Recently viewed</a></li>
                            <li><a href="#">Popular this week</a></li>
                            <li><a href="#">All products</a></li>
                        </ul>
                    </div>

                    <div className="footer__item">
                        <h3 className="footer__item-title">Our company</h3>
                        <ul className="footer__item-links">
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Vacancies</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Returns policy</a></li>
                        </ul>
                    </div>

                    <div className="footer__item footer__item--newsletter">
                        <h3 className="footer__item-title">Join our mailing list</h3>
                        <div className="footer__newsletter newsletter-form newsletter-form--dark">
                            <input type="email" placeholder="your@email.com" className="newsletter-form__input" />
                            <button className="newsletter-form__button">Sign up</button>
                        </div>
                    </div>

                </div>

                <div className="footer__social">
                    <p className="footer__copyright">Copyright 2022 Avion LTD</p>
                    <ul className="footer__links">

                    </ul>
                </div>
            </div>
        </footer>
    )
}