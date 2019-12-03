const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        required: true,
        type: String,
        min: 3,
        max: 255
    },
    slug: {
        required: true,
        type: String,
        min: 3,
        max: 270,
        unique: true
    },
    //todo:add author
    content: {
        required: true,
        type: String,
        min: 3,
        max: 8388608
    },
    addedDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: {
        type: Date,
        default: Date.now(),
    },
    category: {
        required: true,
        type: Schema.Types.ObjectID,
        ref: 'Category'
    },
    tags: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Tag'
        }
    ],
    views: [
        {
            type: Date,
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;