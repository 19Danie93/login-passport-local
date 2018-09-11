const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypt  = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: String,
    password: String
});
//cifrar la contraseña
userSchema.methods.encriptarPassword = (password) =>{
    return  crypt.hashSync(password, crypt.genSaltSync(10));
}

userSchema.methods.compararPassword = function (password) {
    return crypt.compareSync(password,this.password);
}

module.exports = mongoose.model('user', userSchema);