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
    author: {
        required: true,
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    description: {
      required: true,
      type: String,
      min: 2,
      max: 1024
    },
    content: {
        required: true,
        type: String,
        min: 3,
        max: 8388608
    },
    featuredImage: {
      type:  String,
      default: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg'
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now,
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
            type: Schema.Types.ObjectID,
            ref: 'View'
        }
    ],

    //seo
    metaDescription: {
        type: String
    },
    metaKeywords: [
        {type: String}
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;