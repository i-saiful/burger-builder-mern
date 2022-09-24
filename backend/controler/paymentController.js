const PaymentSession = require("ssl-commerz-node").PaymentSession;
const path = require('path')
const { Order } = require('../models/order')

exports.initPayment = async (req, res) => {
    const tran_id = Date.now().toString(16) + Math.random().toString(16).slice(2)
    const payment = new PaymentSession(
        true,
        process.env.SSLCOMMERZ_STORE_ID,
        process.env.SSLCOMMERZ_STORE_PASSWORD
    );

    // Set the urls
    payment.setUrls({
        success: "https://burger-builder-saiful-lab.herokuapp.com/payment/success",
        fail: "https://burger-builder-saiful-lab.herokuapp.com/payment/fail",
        cancel: "https://burger-builder-saiful-lab.herokuapp.com/payment/cancel",
        ipn: "https://ecom-backend-saiful-lab.herokuapp.com/api/payment/ipn",
    });

    // Set order details
    payment.setOrderInfo({
        total_amount: req.body.price, // Number field
        currency: "BDT", // Must be three character string
        tran_id: tran_id // Unique Transaction id
    });

    // Set customer info
    payment.setCusInfo({
        name: "burgerbuilder",
        email: "sslcommerz-burgerbuilder@yahoo.com",
        add1: "66/A Midtown",
        add2: "Andarkilla",
        city: "Chittagong",
        state: "Optional",
        postcode: 4000,
        country: "Bangladesh",
        phone: "010000000000",
        fax: "Customer_fax_id",
    });

    // Set shipping info
    payment.setShippingInfo({
        method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
        num_item: 2,
        name: "Simanta Paul",
        add1: "66/A Midtown",
        add2: "Andarkilla",
        city: "Chittagong",
        state: "Optional",
        postcode: 4000,
        country: "Bangladesh",
    });

    // Set Product Profile
    payment.setProductInfo({
        product_name: "Computer",
        product_category: "Electronics",
        product_profile: "general",
    });

    const result = await payment.paymentInit();

    if (result.status === 'SUCCESS') {
        const order = new Order(req.body)
        order.tran_id = tran_id

        await order.save()
    }
    res.send(result)
}

exports.paymentSuccess = async (req, res) => {
    const order = await Order.findOne({ tran_id: req.body.tran_id })
    if (order) {
        order.status = 'complete',
            order.card_issuer = req.body.card_issuer,
            order.card_brand = req.body.card_brand,
            await Order.updateOne({ tran_id: req.body.tran_id }, order)
    }
    res.sendFile(path.join(__basedir + '/public/success.html'))
}

exports.paymentCancel = async (req, res) => {
    const order = await Order.findOne({ tran_id: req.body.tran_id })
    if (order) {
            await Order.deleteOne({ tran_id: req.body.tran_id })
    }
    res.sendFile(path.join(__basedir + '/public/cancel.html'))
}

exports.paymentFail = async (req, res) => {
    const order = await Order.findOne({ tran_id: req.body.tran_id })
    if (order) {
        await Order.deleteOne({ tran_id: req.body.tran_id })
    }
    res.sendFile(path.join(__basedir + '/public/fail.html'))
}