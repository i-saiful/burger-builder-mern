const express = require('express')
const { Order } = require('../models/order')
const router = express.Router();
const authorize = require('../middlewares/authorize')

const newOrder = async (req, res) => {
    const order = new Order(req.body)
    order.tran_id = Date.now().toString(16) + Math.random().toString(16).slice(2)
    order.status = 'complete'
    try {
        await order.save();
        return res.status(201).send('Order placed successful')
    } catch (error) {
        return res.status(400).send('Sorry Somthing rong!');
    }
}

const orderList = async (req, res) => {
    const order = await Order
        .find({ userId: req.user._id })
        .sort({ orderTime: -1 })
    res.send(order)
}

router.route('/')
    .get(authorize, orderList)
    .post(authorize, newOrder)

module.exports = router;