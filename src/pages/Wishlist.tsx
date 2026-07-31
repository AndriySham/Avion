import { Link } from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import "./Wishlist.css";

export function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="wishlist">
            <div className="container">
                <h2 className="wishlist__title">Your Wishlist</h2>

                {wishlistItems.length === 0 ? (
                    <div className="wishlist__empty">
                        <p className="wishlist__empty-text">Your wishlist is currently empty.</p>
                        <Link to="/" className="btn btn-dark-blue">
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist__grid">
                        {wishlistItems.map((product) => (
                            <div className="wishlist-card" key={product.id}>
                                <div className="wishlist-card__image">
                                    <img src={product.thumbnail} alt={product.title} />
                                    <button
                                        className="wishlist-card__remove-btn"
                                        onClick={() => removeFromWishlist(product.id)}
                                        aria-label="Remove from wishlist"
                                        title="Remove"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="wishlist-card__content">
                                    <div>
                                        <h3 className="wishlist-card__title">{product.title}</h3>
                                        <p className="wishlist-card__price">&#163; {product.price}</p>
                                    </div>
                                    <div className="wishlist-card__actions">
                                        <button
                                            className="btn btn-dark-blue wishlist-card__add-btn"
                                            onClick={() => addToCart(product, 1)}
                                        >
                                            <ShoppingBag size={16} style={{ marginRight: 6 }} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
