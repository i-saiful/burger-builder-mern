import React from 'react';

const Order = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span style={{
                border: "1px solid grey",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "10px",
            }} key={item.type}>{item.amount}x <span style={{ textTransform: "capitalize" }}>{item.type}</span></span>
        )
    })
    return (
        <div style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "10px",
        }}>
            <p>Order Number: {props.order._id}</p>
            <p>Delivery Address: {props.order.customer.deliveryAddress}</p>
            <hr />
            {ingredientSummary}
            <hr />
            {
                props.order.customer.paymentType === 'Pay Now' ?
                    <>
                        {props.order.status === 'complete' ?
                            <>
                                <p>Order Status: Paid</p>
                                <p>Card Issuer: {props.order.card_issuer}</p>
                                <p>Card Brand: {props.order.card_brand}</p>
                            </> :
                            <p>Order Status: Order Cancel</p>
                        }
                    </> :
                    <p>Order Status: {props.order.customer.paymentType}</p>
            }
            <p>Total: {props.order.price} BDT</p>
        </div>
    )
}

export default Order;
