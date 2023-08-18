const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 0,
        max: 4,
        default: 1
    },
    description:String
    
});

const productSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: true
        },
        price:{
            type:Number,
            required: true
        },
        img:String,
        reviews: {
            type: [reviewsSchema],
            default: []
        }

    }
);

mongoose.model(process.env.DB_MODEL_NAME, productSchema, process.env.DB_COLLECTION_NAME);