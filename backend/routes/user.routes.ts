import { Router } from "express";
import { Login, register, Logout } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/isAuth";

const router = Router();

router.post("/register", register);
router.post("/login", Login);
router.get("/logout", isAuthenticated, Logout);


export default router;
