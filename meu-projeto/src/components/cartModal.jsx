import { useState } from "react";
import { useCart } from "../contexts/cartContext";
import CheckoutModal from "./CheckoutModal";

export default function CartModal({ onClose }) {
  const { cart, removeFromCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return (
      <CheckoutModal onBack={() => setShowCheckout(false)} onClose={onClose} />
    );
  }

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seu Carrinho</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {cart.items.length === 0 ? (
              <div className="text-center py-4">
                <div className="display-1 mb-3">🛒</div>
                <p className="text-muted">Seu carrinho está vazio</p>
                <button className="btn btn-primary" onClick={onClose}>
                  Continuar comprando
                </button>
              </div>
            ) : (
              <>
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded"
                  >
                    <div>
                      <h6 className="mb-1">{item.product}</h6>
                      {item.toppings.length > 0 && (
                        <small className="text-muted">
                          Com: {item.toppings.map((t) => t.name).join(", ")}
                        </small>
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-3">
                        R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-top pt-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Total:</h5>
                    <h5 className="mb-0">
                      R$ {cart.total.toFixed(2).replace(".", ",")}
                    </h5>
                  </div>
                </div>
              </>
            )}
          </div>
          {cart.items.length > 0 && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Continuar comprando
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowCheckout(true)}
              >
                Finalizar pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
