import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Search, ShoppingCart, CircleUser, Menu } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { Searchbar } from "../Searchbar/Searchbar";

import "./Header.css";

export function Header() {
    const { cartItems } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

    const productQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const handleUserClick = () => {
        if (user) {
            logout();
        } else {
            navigate('/login');
        }
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__items">
                    <Link to={`/`} className="header__logo">
                        <span>Avion</span>
                    </Link>
                    <div className="header__actions">
                        <button className="header__action" onClick={() => setIsSearchOpen(true)}>
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

                        <button 
                            className="header__action" 
                            onClick={handleUserClick}
                            title={user ? `Logout (${user.firstName})` : 'Login'}
                        >
                            {user ? (
                                <img 
                                    src={user.image} 
                                    alt={user.username} 
                                    style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                                />
                            ) : (
                                <CircleUser size={18} />
                            )}
                        </button>

                        <button className="header__action header__action--burger">
                            <Menu size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <Searchbar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        </header>
    )
}