import User from "../models/user.model.js";
import bcrypt from "bcryptjs"




// Register User

export const register = async (req, res) => {
    try{

        const {fullname, email, password, phoneNumber, role} = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
        return res.status(400).json({
            message: "Something is missing",
            success: false
        })};

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch(error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });

    }
};



//Login User

export const login = async (req, res) => {
    try{

        const {email, password, role} = req.body;

        if(!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        };

        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        };

        // check role is correct or not

        if(role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exists with current role",
                success: false
            })
        };

        // generate token
        const tokenData = {
            userId: user._id
        }

        const token =  jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch(error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}
