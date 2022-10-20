import express from "express";
import {showArtist, showManege, showSecurity} from "../controllers/organisateurs.controller.js";
const router = express.Router();

router.get("/manege", showManege);

router.get("/security", showSecurity);

router.get("/artist", showArtist);

export default router;