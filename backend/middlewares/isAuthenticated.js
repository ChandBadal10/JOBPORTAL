import jwt from "jsonwebtoken";

const authenticatedToken = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            })
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        req.id = decoded.userId;
        next();

    } catch(error){
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
}

export default authenticatedToken;