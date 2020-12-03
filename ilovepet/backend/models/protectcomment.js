const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const protectcommentSchema = new Schema({
    
    commentUserid: {
        type: String,
        required: true,
    },
    commentUserpwd:{
        type:String,
        required:true,

    },
    commentContent: {
        type: String,
        required: true,
    },
    commentId: {
        type: String,
        required: true,
    },
   
    
    
});

//boardSchema.plugin(mongooseAutoInc.plugin, 'board');
module.exports = mongoose.model('protectcomment', protectcommentSchema);