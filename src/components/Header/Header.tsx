import { Link } from "react-router-dom";

import { Search, ShoppingCart, CircleUser, Menu } from "lucide-react";

import { useCart } from "../../context/CartContext";

import "./Header.css";

export function Header() {
    const { cartItems } = useCart();
    const productQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    return (
        <header className="header">
            <div className="container">
                <div className="header__items">
                    <Link to={`/`} className="header__logo">
                        <span>Avion</span>
                    </Link>
                    <div className="header__actions">
                        <button className="header__action">
                            <Search size={18} />
                        </button>

                        <button className="header__action header__action--cart">
                            <Link to={`/cart`}>
                                <ShoppingCart size={18} />
                                {productQuantity > 0 && (
                                    <span className="header__action-cart-count">{productQuantity}</span>
                                )}
                            </Link>
                        </button>

                        <button className="header__action">
                            <CircleUser size={18} />
                        </button>

                        <button className="header__action header__action--burger">
                            <Menu size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}