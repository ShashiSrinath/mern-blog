const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name : {
        required: true,
        type: String,
        min: 1,
        max: 255,
        unique: true
    },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;