import { useState } from "react";
import { useCart } from "../contexts/cartContext";
import { toast } from "react-toastify";

export default function CheckoutModal({ onBack, onClose }) {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    paymentMethod: "credit-card",
    change: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aqui você vai integrar com sua API
      const orderData = {
        items: cart.items,
        total: cart.total,
        delivery: formData,
        payment: {
          method: formData.paymentMethod,
          change: formData.change,
        },
      };

      // Simular envio para API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      clearCart();
      onClose();
      toast.success(
        "Pedido realizado com sucesso! Em breve entraremos em contato."
      );
    } catch (error) {
      toast.error("Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Finalizar Pedido</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Informações de Entrega */}
              <div className="mb-4">
                <h6 className="mb-3">Informações de Entrega</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nome completo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Telefone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Endereço</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Número</label>
                    <input
                      type="text"
                      className="form-control"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Complemento</label>
                    <input
                      type="text"
                      className="form-control"
                      name="complement"
                      value={formData.complement}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Bairro</label>
                    <input
                      type="text"
                      className="form-control"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="mb-4">
                <h6 className="mb-3">Forma de Pagamento</h6>
                <div className="d-flex flex-wrap gap-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      id="credit-card"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="credit-card">
                      Cartão de Crédito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      id="debit-card"
                      value="debit-card"
                      checked={formData.paymentMethod === "debit-card"}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="debit-card">
                      Cartão de Débito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      id="pix"
                      value="pix"
                      checked={formData.paymentMethod === "pix"}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="pix">
                      PIX
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="paymentMethod"
                      id="cash"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="cash">
                      Dinheiro
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === "cash" && (
                  <div className="mt-3">
                    <label className="form-label">Troco para</label>
                    <input
                      type="text"
                      className="form-control"
                      name="change"
                      value={formData.change}
                      onChange={handleInputChange}
                      placeholder="R$ 0,00"
                      disabled={isLoading}
                    />
                  </div>
                )}
              </div>

              {/* Resumo do Pedido */}
              <div className="mb-4">
                <h6 className="mb-3">Resumo do Pedido</h6>
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center mb-2"
                  >
                    <div>
                      <span>{item.product}</span>
                      {item.toppings.length > 0 && (
                        <small className="text-muted d-block">
                          Com: {item.toppings.map((t) => t.name).join(", ")}
                        </small>
                      )}
                    </div>
                    <span>
                      R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                    </span>
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
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onBack}
              disabled={isLoading}
            >
              Voltar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "Finalizar Pedido"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
