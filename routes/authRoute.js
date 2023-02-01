const express = require('express');
const { createUser, loginUserCtrl, getAllUsers, logout } = require('../controller/userCtrl');
const { isAdmin } = require('../middlewares/authMiddleWare');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/allUsers", isAdmin, getAllUsers);
router.get("/logout", logout);

module.exports = router;