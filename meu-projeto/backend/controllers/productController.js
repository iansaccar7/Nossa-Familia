const db = require('../config')

const getProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err })
        res.json(results)
    })
}

const addProduct = (req, res) => {
    const { name, price, free_toppings } = req.body
    db.query('INSERT INTO products (name, price, free_toppings) VALUES (?, ?, ?)', [name, price, free_toppings], (err, results) => {
        if (err) return res.status(500).json({ error: err })
        res.status(201).json({ id: results.insertId, name, price, free_toppings })
    })
}

module.exports = { getProducts, addProduct }