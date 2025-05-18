const express = require('express');
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

//ROTAS

const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/products', productRoutes)

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001")
})
