import express from "express"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import authenticatedToken from "../middlewares/isAuthenticated.js";


const companyRouter = express.Router();


companyRouter.post("/register", authenticatedToken, registerCompany);
companyRouter.get("/get", authenticatedToken, getCompany );
companyRouter.get("/get/:id",authenticatedToken, getCompanyById);
companyRouter.put("/update/:id",authenticatedToken, updateCompany);



export default companyRouter;