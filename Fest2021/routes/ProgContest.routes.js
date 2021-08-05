const express = require("express");
const router = express.Router();

const { 
    ensureAuthenticated, 
    addUserData 
} = require("./../middlewares/auth.middleware");

const { 
    getPC,
    postPC,
} = require('../controllers/progContest.controller');

router.get("/register", ensureAuthenticated, addUserData, getPC);
router.post("/register", ensureAuthenticated, addUserData, postPC);

module.exports = router;