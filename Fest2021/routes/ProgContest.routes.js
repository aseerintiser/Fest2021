const express = require("express");
const router = express.Router();

const { 
    ensureAuthenticated, 
    addUserData 
} = require("./../middlewares/auth.middleware");

const { 
    getPC 
} = require('../controllers/progContest.controller');

router.get("/register", ensureAuthenticated, addUserData, getPC);

module.exports = router;