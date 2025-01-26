import express from "express";

// controllers
import {login, signup, } from '../controllers/authControllers.js'

const router = express();

router.post('/signup', signup);
router.post('/login', login);

export default router;