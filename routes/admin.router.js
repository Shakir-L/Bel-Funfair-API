import express from "express";
import {getAllPermissions} from "../controllers/admin.controller.js";
import {validatePermissions} from "../middlewares/admin.middlewares.js";

var router = express.Router();

// http://localhost:3000
router.get("/:role/:id",validatePermissions,getAllPermissions);
/**
 * @swagger
 * /{role}/{id}:
 *   get:
 *      description: Used to go to organisateur page
 *      tags:
 *          - admin
 *      parameters:
 *          - in: path
 *            name: role
 *            type: string
 *            required: true
 *            description: STRING value of the role of the user to get
 *          - in: path
 *            name: id
 *            type: int
 *            required: true
 *            description: INT value of the id of the user to get
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

export default router;