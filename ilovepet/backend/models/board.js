const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    
    boarduserid: {
        type: String,
        required: true,
    },
    boarduserpsw:{
        type:String,
        required:true,

    },
    boardtitle: {
        type: String,
        required: true,
    },
    boardcontent: {
        type: String,
        required: true,
    },
    
    
});

//boardSchema.plugin(mongooseAutoInc.plugin, 'board');
module.exports = mongoose.model('board', boardSchema);