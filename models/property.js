const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema (
    {
        name: { type: String, required: true },
        unit: { type: String, required: true },
        street: { type: String, required: true },
        postalCode: { type: Number, required: true },
        district: Number,
        image: [String],
        googleMapLink: String,
        propertyType: { type: String, required: true }, //HDB, Condo, Landed
        purchaseValue: { type: Number, required: true , min: 0, max: 1000000000 }, // Amount user bought it for
        currentValue: { type: Number, required: true , min: 0, max: 1000000000 }, // Current price for property
        historicalValue: [Number],
        rentalAmount: Number,
        historicalRentalAmount: [Number],
        status: { type: String, required: true },
        installmentAmount: Number,
        loanLeft: Number,
        belongsTo: { type: String, required: true}
    }, 
    {
        timestamps: true
    }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;