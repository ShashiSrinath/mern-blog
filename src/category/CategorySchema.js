const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        required: true,
        type: String,
        min: 2,
        max: 512,
        unique: true
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;