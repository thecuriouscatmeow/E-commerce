const router = require("express").Router();
const user = ("../models/User");

const authController = require("../controllers/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
