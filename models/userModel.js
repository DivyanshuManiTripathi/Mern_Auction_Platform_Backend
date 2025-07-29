const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { use } = require('react');
const userSchema = new mongoose.Schema({
   userName:{
     type: String,
     required: true,
     minLength:[3,"Username must be at least 3 characters"],
     maxLength:[40,"Username can not exceed 40 characters"],
   },
   password: {
     type: String,
     select:false,
     required: true,
     minLength:[8,"Password must contain at least 8 characters"],
     maxLength:[32,"Password can not exceed 32 characters"],
   },
   email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
   },
   phone: {
        type: String,
        unique: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
   },
    address:{
        type: String,
        required: true,
        minLength:[10,"Address must be at least 10 characters"],
        maxLength:[100,"Address can not exceed 100 characters"],
    },
   profileImage:{
        publicId: {
             type: String,
             required: true,
        },
        url: {
             type: String,
             required: true,
        },
   },
    role: {
         type: String,
         enum: ['Auctioner', 'Bidder','SuperAdmin'],
         default: 'user',
     },
   paymentMethods:{
     bankTransfer: {
         bankAccountNumber:String,
         bankAccountName:String,
         bankName:String,
     },
     razorpay: {
         razorpayAccountId: String,
     },
     paypal:{
        paypalEmail: String,
     },
     unpaidCommision:{
        type: Number,
        default: 0,
     },
     auctionsWon:{
        type:Number,
        default: 0,
     },
     moneySpent:{
        type: Number,
        default: 0,
     },
     createdAt: {
         type: Date,
         default: Date.now,
     },
   }
 });
 userSchema.pre('save', async function (next) {
     if (this.isModified('password')) {
         this.password = await bcrypt.hash(this.password, 10);
     }
     next();
 });
// compare password
userSchema.methods.comparePassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}
const User= mongoose.model('User', userSchema);
module.exports={User};
