const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authControllers");

router.post("/users", authController.signup);

module.exports = router;
