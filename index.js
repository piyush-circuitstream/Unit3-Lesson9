const mongoose = require('mongoose');
// const Order = require('./models/order');

//Connection of mongoDB
mongoose.connect('mongodb://localhost:27017/test')
    .then((data) => {
        console.log("My database is connected!")
    }).catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
    });

// const breakfastSchema = mongoose.Schema({
//     eggs: {
//         type: Number,
//         // required: true,
//         // default: 0,
//         min: [6, 'Too few eggs'],
//         max: 12
//     },
//     bacon: {
//         type: Number,
//         required: [true, 'Why no bacon?']
//     },
//     drink: {
//         type: String,
//         enum: ['Coffee', 'Tea'],
//         required: function () {
//             return this.bacon > 3;
//         }
//     }
// });

// const Breakfast = mongoose.model('Breakfast', breakfastSchema);

// async function createBreakfast() {
//     const badBreakfast = new Breakfast({
//         eggs: 8,
//         bacon: 3,
//         drink: 'Coffee'
//     });

//     await badBreakfast.save();
// }

// // createBreakfast();

// async function queryBreakfast() {
//     // const result = await Breakfast.find({}, 'eggs bacon');//selecting fields to show
//     // const result = await Breakfast.find({}, { _id: false, eggs: true, bacon: true }); //selecting fields to show
//     // const result = await Breakfast.find().select('eggs drink'); //selecting fields to show

//     //Filtering
//     // const result = await Breakfast.find({ eggs: 8 }); //$gt, $gte, $ne, $lt, $lte (eggs: {$gt: 8})

//     //Sorting
//     // const result = await Breakfast.find().sort({ eggs: 1, bacon: -1 });

//     //Pagination
//     // const result = await Breakfast.find().limit(3).skip(4);

//     //Query builder
//     const result = await Breakfast.find()
//         .where('eggs').gte(8)
//         .where('bacon').lt(2)
//         .sort({ bacon: 1 })
//         .limit(3);

//     console.log(result);
// }

// // queryBreakfast();

// //Embedding Document Example
// async function createOrder() {
//     const orderOne = new Order({
//         orderId: 'ORD12347',
//         customer: {
//             name: 'John Doe 3',
//             email: 'john.doe3@gmail.com',
//             phone: '1234567890'
//         },
//         items: [
//             {
//                 itemId: 'ITEM001',
//                 name: 'White Sauce Pasta',
//                 quantity: 1,
//                 price: 12.99
//             },
//             {
//                 itemId: 'ITEM002',
//                 name: 'Garlic Bread',
//                 quantity: 4,
//                 price: 5.99
//             }
//         ],
//         paymentMethod: 'cash',
//         totalPrice: 35.95,
//         orderStatus: 'delivered'
//     });

//     await orderOne.save();
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Referencing Example
// Define the schema for a 'User' document
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

// Define the schema for an 'Order' document, referencing the 'User' model
const orderSchema = new mongoose.Schema({
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User
});

// Create the 'User' and 'Order' models
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

// Example of creating a user and an order that references the user
async function createOrder() {
    const user = new User({
        name: 'John Doe',
        email: 'john.doe@example.com'
    });

    await user.save();

    const order = new Order({
        totalPrice: 200,
        status: 'completed',
        user: user._id // Referencing the User by its ObjectId
    });

    await order.save();

    // Populate the 'user' field in the order to get the full user document
    const populatedOrder = await Order.findOne({ _id: order._id }).populate('user');
    console.log('Populated Order:', populatedOrder);
}

createOrder();
