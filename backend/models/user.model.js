import mongoose from "mongoose"



const userSchema  = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required :true
    },

    password: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true
    },

    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String}, // URL TO RESUME FILE
        resumeOriginalName: {type: String},
        company: {type: mongoose.Schema.Types.ObjectId, ref: "company"},
        profilePhoto: {
            type: String,
            default: ""
        }

    }


}, {timestamps: true})


const userModel = mongoose.model("User", userSchema)

export default userModel;