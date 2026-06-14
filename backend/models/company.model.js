import mongoose from "mongoose";


const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    website: {
        type: String
    },

    location: {
        type: String,

    },

    logo: {
        type: String // url of logo
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }

}, {timestamps: true});

const companyModel = mongoose.Schema("Company", companySchema)
export default companyModel