import express from "express";
import {showArtist, showManege, showStand} from "../controllers/prestataires.controller.js";
const router = express.Router();

router.get("/manege", showManege);

router.get("/stand", showStand);

router.get("/artist", showArtist);

export default router;