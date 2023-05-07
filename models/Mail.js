const mongoose = require('mongoose');
const {isEmail} = require('validator')
const mailSchema = new mongoose.Schema({
    emailReceiver: {
        type: String,
        require: [true, 'Please enter email '],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
      },
      emailSender: {
        type: String,
        require: [true, 'Please enter email '],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
      },
   
    title: String,
    body: String,
    isDraft: false,
    fileUpload : String,

    
},
    { timestamps: true}
);

const Mail = mongoose.model('mail', mailSchema);
module.exports = Mail;