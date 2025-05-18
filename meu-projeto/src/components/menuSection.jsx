import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import OrderModal from "./cartModal";

export default function MenuSection({ category }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="mb-5">
      <h3 className="h2 mb-4">{category.name}</h3>
      <div className="row g-4">
        {category.items.map((item, index) => (
          <div key={index} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h4 className="card-title h5 mb-3">{item.name}</h4>
                <div className="h3 mb-3 text-primary">R$ {item.price}</div>
                <ul className="list-unstyled mb-4">
                  {item.ingredients.map((ingredient, i) => (
                    <li key={i} className="d-flex align-items-center mb-2">
                      <FiCheck className="text-success me-2" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => setSelectedItem(item)}
                >
                  Pedir agora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
