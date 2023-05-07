const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: [true, 'Please enter full name '], 
    },
    email: {
        type: String,
        require: [true, 'Please enter email '],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
      },
      phoneNumber: Number,
      isVerified: {
        type: Boolean,
        default: true,
        require: [true, 'Please enter phone number '],
      },
      password: {
        type: String,
        required:  [true, 'Please enter password'],
        minLength:  [6, 'Minimum password length is 6 characters'],
      },   
});



userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// userSchema.pre('findOneAndUpdate', async function (next) {
//   const update = { ...this.getUpdate() };

//   // Only run this function if password was modified
//   if (update.password) {

//     // Hash the password
//     const salt = genSaltSync();
//     update.password = await hash(update.password, salt);
//     this.setUpdate(update);
//   }
//   next();
// })


userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email})
    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user

        } throw Error('incorrect password')
    }
    throw Error('Incorrect Email')
}

const User = mongoose.model('user', userSchema);
module.exports = User;
