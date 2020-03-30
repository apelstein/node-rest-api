const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: {type: Number, required:true},
    productImage: {type: String}
});

module.exports = mongoose.model('Product', productSchema);
