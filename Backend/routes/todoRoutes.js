import express from "express";
import isLoggedIn from "../config/isLoggedin.js";

import { create, deletetodo, alltodos, edittodo } from "../controllers/todoControllers.js";

const router = express.Router();

router.post('/create', isLoggedIn, create);
router.delete('/delete/:id', isLoggedIn, deletetodo);
router.post('/edittodo/:id', isLoggedIn, edittodo)
router.get('/alltodos', isLoggedIn, alltodos)

export default router;