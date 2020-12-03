const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const findboardSchema = new Schema({
    
    findboarduserid: {
        type: String,
        required: true,
    },
    findboarduserpsw:{
        type:String,
        required:true,

    },
    findboardtitle: {
        type: String,
        required: true,
    },
    findboardcontent: {
        type: String,
        required: true,
    },
    findboardplace: {
        type: String,
        required: true,
    },
    findboardimg: {
        type: String,
        contentType:String,
    },
   
});

//boardSchema.plugin(mongooseAutoInc.plugin, 'board');
module.exports = mongoose.model('findboard', findboardSchema);