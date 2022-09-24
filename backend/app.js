const express = require('express');
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const userRouter = require('./routers/userRouter')
const orderRouter = require('./routers/orderRouter')
const paymentController = require('./routers/paymentRouter')

const app = express();

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/payment', paymentController)

module.exports = app;