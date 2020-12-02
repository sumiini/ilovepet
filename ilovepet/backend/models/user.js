
const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    userid: {
        type: String,
        required: true,
    },
    userpassword: {
        type: String,
        required: true,
    },
});

//userSchema.plugin(mongooseAutoInc.plugin, 'user');
module.exports = mongoose.model('user', userSchema);