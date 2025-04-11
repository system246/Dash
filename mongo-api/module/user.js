const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    Password : String,
    email : String,
});

const User = mongoose.model('user', UserShema)
module.exports = User;