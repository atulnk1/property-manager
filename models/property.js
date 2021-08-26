const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema (
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        type: { type: String, required: true },
        purchaseValue: { type: Number, required: true , min: 0},
        historicalValue: [Number],
        status: { type: String, required: true },
    }, 
    {
        timestamps: true
    }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;