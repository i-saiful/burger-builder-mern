const router = require('express').Router()
const authorize = require('../middlewares/authorize')
const { initPayment, paymentSuccess, paymentCancel, paymentFail } = require('../controler/paymentController')

router.route('/')
    .post(authorize, initPayment)

router.route('/success')
    .post(paymentSuccess)

router.route('/fail')
    .post(paymentFail)

router.route('/cancel')
    .post(paymentCancel)

module.exports = router;