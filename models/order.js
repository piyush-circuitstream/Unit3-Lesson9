const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Item Schema
const itemSchema = new Schema({
    itemId: {
        type: String,
        required: true,
        minlength: 1,
        description: "Unique identifier for the menu item"
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        description: "Name of the menu item"
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        description: "Number of items ordered"
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
        description: "Price per item"
    },
    specialInstructions: {
        type: String,
        maxlength: 255,
        description: "Special instructions for preparation"
    }
});

// Define Customer Schema
const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        description: "Customer's full name"
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        description: "Customer's email address"
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
        description: "Customer's phone number (10 digits)"
    }
});

// Define the Restaurant Order Schema
const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10,
        description: "A unique identifier for the order"
    },
    customer: {
        type: customerSchema,
        required: true,
        description: "Customer details"
    },
    items: {
        type: [itemSchema],
        required: true,
        validate: [arrayLimit, 'Order must contain at least one item'],
        description: "List of ordered items"
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit_card', 'cash', 'paypal', 'gift_card'],
        description: "Payment method for the order"
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0.01,
        description: "Total price of the order, including taxes and tips"
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
        description: "Current status of the order"
    }
}, { timestamps: true });

// Custom Validator to ensure at least one item is in the order
function arrayLimit(val) {
    return val.length > 0;
}

// Create a Model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };