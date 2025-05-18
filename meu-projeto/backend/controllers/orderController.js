const db = require('../config')

const createOrder = (req, res) => {
    const { user_id, items, total_price } = req.body
    const orderId = 'order_' + Date.now()

    db.query('INSERT INTO orders (id, user_id, total_price) VALUES (?, ?, ?)', [orderId, user_id, total_price], (err, result) => {
        if (err) return res.status(500).json({ error: err })

        items.array.forEach(item => {
            db.query('INSERT INTO order_items (order_id, product_name, total_price) VALUES (?, ?, ?)', [orderId, item.name, item.total_price], (err, result) => {
                if (err) return res.status(500).json({ error: err })
            })
        });
        res.status(201).json({ message: 'Pedido criado com sucesso', orderId })
    })
}

module.exports = { createOrder }