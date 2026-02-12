import express from "express";

import {login} from "../controllers/auth.controller.js";


const router = express.Router();


router.post("/Login",login);


export default router;

