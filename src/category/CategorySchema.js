const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        required: true,
        type: String,
        min: 2,
        max: 512,
        unique: true
    },
    featuredImage: {
        required: true,
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    metaDescription: {
        type: String
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;