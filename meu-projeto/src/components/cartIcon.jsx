import { useState } from "react";
import { useCart } from "../contexts/cartContext";
import CartModal from "./CartModal";

export default function CartIcon() {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <div
        className="position-fixed bottom-0 end-0 m-4"
        style={{ zIndex: 1030 }}
      >
        <button
          className="btn btn-primary rounded-circle p-3 shadow"
          onClick={() => setShowCart(true)}
          style={{ width: "60px", height: "60px" }}
        >
          🛒
          {cart.items.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.items.length}
            </span>
          )}
        </button>
      </div>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </>
  );
}
