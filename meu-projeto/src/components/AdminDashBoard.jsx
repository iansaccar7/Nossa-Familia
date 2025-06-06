import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, unit: "" });

  async function handleAddItem(e) {
    e.preventDefault();
    // You can implement your own inventory management logic here
    toast.success("Item adicionado com sucesso");
    setNewItem({ name: "", quantity: 0, unit: "" });
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Painel Administrativo</h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Estoque</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddItem} className="mb-4">
                <div className="row g-3">
                  <div className="col-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nome do item"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantidade"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Unidade"
                      value={newItem.unit}
                      onChange={(e) =>
                        setNewItem({ ...newItem, unit: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-sm">
                    <button type="submit" className="btn btn-primary">
                      Adicionar
                    </button>
                  </div>
                </div>
              </form>

              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantidade</th>
                    <th>Unidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => {}}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {}}
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Pedidos</h3>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id.slice(0, 8)}</td>
                      <td>R$ {order.total_price}</td>
                      <td>{order.status}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={() => {}}
                        >
                          <option value="pending">Pendente</option>
                          <option value="preparing">Preparando</option>
                          <option value="ready">Pronto</option>
                          <option value="delivered">Entregue</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
