const { Schema, model } = require('mongoose');

const orderSchema = Schema({
    userId: Schema.Types.ObjectId,
    ingredients: [
        {
            type: { type: String },
            amount: Number
        }
    ],
    customer: {
        deliveryAddress: String,
        phone: String,
        paymentType: String
    },
    price: Number,
    orderTime: {
        type: Date,
        default: Date.now
    },
    card_issuer: String,
    card_brand: String,
    tran_id: String,
    status: {
        type: String,
        enum: ['pendding', 'complete'],
        default: 'pendding'
    }
})

exports.Order = model('Order', orderSchema);