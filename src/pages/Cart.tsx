import { X } from "lucide-react";

import { useCart } from "../context/CartContext";

import "./Cart.css";

export function Cart() {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const subTotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );
    const formattedSubTotal = subTotal.toFixed(2);

    return (
        <div className="cart">
            <div className="container">
                <h2 className="cart__title">Your shopping cart</h2>
                <div className="cart__list line" >
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.product.id}>

                            <div className="cart-item__image">
                                <img src={item.product.thumbnail} alt={item.product.title} />
                            </div>

                            <div className="cart-item__details">
                                <div className="cart-item__info">
                                    <div className="cart-item__title-row">
                                        <h3 className="cart-item__title">{item.product.title}</h3>
                                        <button
                                            className="cart-item__remove-btn"
                                            onClick={() => removeFromCart(item.product.id)}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <div className="cart-item__description">{item.product.description}</div>
                                    <div className="cart-item__price">&#163; {item.product.price}</div>
                                </div>


                                <div className="cart-item__actions">
                                    <div className="cart-item__counter">
                                        <button
                                            className="cart-item__counter-btn"
                                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                        >
                                            -
                                        </button>
                                        <span className="cart-item__counter-value">{item.quantity}</span>
                                        <button
                                            className="cart-item__counter-btn"
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="cart__total-wrapper">
                    <h4 className="cart__total-lable">Subtotal</h4>
                    <div className="cart__total-value">&#163; {formattedSubTotal}</div>
                </div>
                <p className="cart__info">Taxes and shipping are calculated at checkout</p>
                <button className="btn btn-dark-blue cart__button">Go to checkout</button>
            </div>
        </div>
    )
}