import express from "express";
import {authenticateUser, home, login, logout} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/",home)
router.get("/login",login);
router.post("/login",authenticateUser);
router.get("/logout", logout)

export default router;