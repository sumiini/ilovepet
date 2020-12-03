const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const protectboardSchema = new Schema({
    
    protectboarduserid: {
        type: String,
        required: true,
    },
    protectboarduserpsw:{
        type:String,
        required:true,

    },
    protectboardtitle: {
        type: String,
        required: true,
    },
    protectboardcontent: {
        type: String,
        required: true,
    },
    protectboardplace: {
        type: String,
        required: true,
    },
    protectboardimg: {
        type: String,
        contentType:String,
    },
   
});

//boardSchema.plugin(mongooseAutoInc.plugin, 'board');
module.exports = mongoose.model('protectboard', protectboardSchema);