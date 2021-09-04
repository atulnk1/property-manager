const express = require("express");
const propertyModel = require("../models/property");
const authController = require("./authController")
const controller = express.Router();

controller.get("/seeds", async (req, res) => {
    try {
        await propertyModel.insertMany([
            {
                name: "City Gate",
                unit: "02-23",
                street: "371 Beach Road",
                postalCode: "199597",
                district: 7,
                image: ["https://dwk5ggjgl5r05.cloudfront.net/v3/H8LrBwnW7EQDNEXfeFGdDM?mode=fill&text=99.co&sampling=lanczos&quality=80&version=1&is_watermark=True&signature=9789c6dd6d0eedc713c8b2ae3e821266aa4bb751&height=884&width=1480"],
                googleMapLink: "https://www.google.com/maps/place/City+Gate/@1.3022965,103.8622714,15z",
                propertyType: "Condo", 
                purchaseValue: 1230000, 
                currentValue: 1500000, 
                historicalValue: [1000000, 1100000, 1230000],
                rentalAmount: 5000,
                historicalRentalAmount: [4500, 5000, 5000, 5000, 5000],
                status: "Rented",
                installmentAmount: 4100,
                loanLeft: 0,
                belongsTo: "atulnk1@gmail.com"
            },
            {
                name: "Martin Mordern",
                unit: "12-16",
                street: "8 Martin Place",
                postalCode: "237992",
                district: 9,
                image: ["https://dwk5ggjgl5r05.cloudfront.net/v3/LDRCvwT7vnE9PpzrX6cRAR?mode=fill&text=99.co&sampling=lanczos&quality=80&version=1&is_watermark=False&signature=199203ad009adce1cc4b3aba501b893b9aabe169", "https://dwk5ggjgl5r05.cloudfront.net/v3/V2NAESG5KQueoD7tDZBxxL?mode=fill&text=99.co&sampling=lanczos&quality=80&version=1&is_watermark=True&signature=0b215789d96c38b3a7a86ee7a33eef361ed91af4"],
                googleMapLink: "https://www.google.com/maps/place/Martin+Modern/@1.2934572,103.8359068,17z/data=!3m1!4b1!4m5!3m4!1s0x31da19536b241cc9:0xbb242fa24f16d539!8m2!3d1.2934572!4d103.8380955",
                propertyType: "Condo", 
                purchaseValue: 2500000, 
                currentValue: 3000000, 
                historicalValue: [1900000, 2000000, 2500000],
                rentalAmount: 10000,
                historicalRentalAmount: [10000, 10000, 10000, 10000, 10000],
                status: "Rented",
                installmentAmount: 5000,
                loanLeft: 1200000,
                belongsTo: "atulnk1@gmail.com"
            },
            {
                name: "The Landmark",
                unit: "30-02",
                street: "173 Chin Swee Road",
                postalCode: "169878",
                district: 3,
                image: ["https://dwk5ggjgl5r05.cloudfront.net/v3/G94KQv2E2YPpEwGTKMjSAk?mode=fill&text=99.co&sampling=lanczos&quality=80&version=1&is_watermark=True&signature=a30be0e92cc4ab733c00f35d97247ea17bcade38&height=884&width=1480", "https://dwk5ggjgl5r05.cloudfront.net/v3/V2NAESG5KQueoD7tDZBxxL?mode=fill&text=99.co&sampling=lanczos&quality=80&version=1&is_watermark=True&signature=0b215789d96c38b3a7a86ee7a33eef361ed91af4", "https://dwk5ggjgl5r05.cloudfront.net/v3/L98d6sxg7QxsF4sx8YVAHN?mode=fill&text=99.co&sampling=lanczos&quality=80&version=1&is_watermark=True&signature=e8a9e7f375857d983f3e5232528ba06c3b930612&height=884&width=1480", "https://dwk5ggjgl5r05.cloudfront.net/v3/raPVvJfw3X7YMP6WXnzg8i?mode=fill&text=99.co&sampling=lanczos&quality=80&version=1&is_watermark=True&signature=6fd3eb8dc8a8f233db539128d4d1a791537aba01&height=884&width=1480"],
                googleMapLink: "https://www.google.com/maps/place/Martin+Modern/@1.2934572,103.8359068,17z/data=!3m1!4b1!4m5!3m4!1s0x31da19536b241cc9:0xbb242fa24f16d539!8m2!3d1.2934572!4d103.8380955",
                propertyType: "Condo", 
                purchaseValue: 3500000, 
                currentValue: 4000000, 
                historicalValue: [2850000, 2900000, 3000000, 3250000, 3500000],
                rentalAmount: 0,
                historicalRentalAmount: [],
                status: "Occupied",
                installmentAmount: 0,
                loanLeft: 0,
                belongsTo: "atul@resdiary.com"
            },
        ]);
        res.send("Seed data added")
    } catch (e) {
        res.status(400).send({
            name: e.name,
            message: e.message
        })
    }
    
});

module.exports = controller;
