// Load required packages
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const {Schema} = mongoose;

// Define our user schema in mongoose
var UserSchema = new mongoose.Schema({
	username: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    hash: String,
    salt: String,
    university: {type:String, required:true},
    firstName: String,
    lastName: String,
    major: String,
    year: String,
    expectedGraduation: Date,
	dateCreated: {type:Date, default:Date.now},
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Post'
        }
    ]
}, {versionKey: false});


UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
        username: this.username,
        university: this.university,
        firstName: this.firstName,
        lastName: this.lastName,
        major: this.major,
        year: this.year,
        expectedGraduation: this.expectedGraduation,
    };
};



module.exports = mongoose.model("User", UserSchema);
