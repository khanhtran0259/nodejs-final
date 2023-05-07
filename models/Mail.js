const mongoose = require('mongoose');
const mailSchema = new mongoose.Schema({
    emailReceiver: String,
    emailSender: String,
    title: String,
    body: String,
    isDraft: false,
    fileUpload : String,

    
},
    { timestamps: true}
);

const Mail = mongoose.model('mail', mailSchema);
module.exports = Mail;