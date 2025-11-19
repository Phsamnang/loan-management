import express from "express";
const router = express.Router();
import AuthController from "../controllers/authController.js";
import { ro } from "date-fns/locale";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);


export default router;