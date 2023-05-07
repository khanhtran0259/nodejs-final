const User = require('../models/User');
const Mail = require('../models/Mail');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//handle error
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {fullName : '', email :'', phoneNumber: '',password :''};
    //duplicate error E11000
    if(err.code === 11000){
        errors.email = 'That email is already registered'
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message
        })
    }
    return errors
}
const handleErrorsLogin = (err) => {
    console.log(err.message, err.code);
    let errors = {email :'',password :''};

    if(err.message === 'Incorrect Email'){
        errors.email = 'that email is not registered';
    }
    if(err.message === 'incorrect password'){
        errors.password = 'that password is not correct';
    }
    //duplicate error E11000
   
    return errors
}

const maxAge = 60
const createToken = (id) => {
    return jwt.sign({id}, 'email clone', {
        expiresIn: maxAge
    })
}


module.exports.register_get = (req, res) => {
    res.render('register')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.register_post = async (req, res) => {
    const {fullName, email, phoneNumber, password} = req.body
    const rePassword = ""
    console.log(fullName, email, phoneNumber, password)

    try{
        const user = await User.create({fullName, email, phoneNumber, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(201).json({user: user._id})
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body



    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({user: user._id})
    }
    catch (err) {
        const errors = handleErrorsLogin(err)
        res.status(400).json({errors})
    }
}

module.exports.forgor_get = (req, res) => {
    res.render('forgotPass')
}

module.exports.forgot_post = async (req, res) => {
    const resetPassword = async (email , password) => {
        
        
        const hash = await bcrypt.hash(password, Number(bcryptSalt));
        await User.updateOne(
          { _id: userId },
          { $set: { password: hash } },
          { new: true }
        );
        const user = await User.findById({ _id: userId });
        sendEmail(
          user.email,
          "Password Reset Successfully",
          {
            name: user.name,
          },
          "./template/resetPassword.handlebars"
        );
        await passwordResetToken.deleteOne();
        return true;
      };
}


module.exports.inboxmail_get = (req, res) => {
    const receiverEmail = Mail.emailReceiver;
    const query = Mail.findOne({ emailReceiver: receiverEmail });

    query.exec(function (err, mail) {
    if (err) return handleError(err);

    if (mail) {
        res.render('inbox', { emailReceiver: mail.emailReceiver });
    } else {
        // Handle case where no mail was found
        res.render('home')
    }
    });
  };

module.exports.sentmail_get = (req, res) => {
    res.render('sent')
}

module.exports.receivedmail_get = (req, res) => {
    res.render('received')
}
module.exports.formEmail_get = (req, res) => {
    res.render('formEmail')
}

module.exports.formEmail_post = async (req, res) => {
    const {emailReceiver, emailSender, title, body, fileUpload} = req.body
    console.log(emailReceiver, emailSender, title, body)

    const mail = await Mail.create({emailReceiver, emailSender, title, body, fileUpload})
    const token = createToken(mail._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
    res.status(201).json({user: mail._id})
   
}

module.exports.details_get = async (req, res) => {
    res.render("details");
  };