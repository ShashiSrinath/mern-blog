const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewSchema = new Schema({
    post: {
        type: Schema.Types.ObjectID,
        ref: 'Post'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const View = mongoose.model('View', viewSchema);

module.exports = View;