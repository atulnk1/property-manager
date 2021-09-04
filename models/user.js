const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema (
    {
        email: { type: String, unique: true },
        name: String,
        google: {
            id: String,
            email: String,
            displayName: String
        }
    }, 
    {
        timestamps: true
    }
);


const User = mongoose.model("User", userSchema);

module.exports = User;