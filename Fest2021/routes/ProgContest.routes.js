const express = require("express");
const router = express.Router();

const { 
    ensureAuthenticated, 
    addUserData 
} = require("./../middlewares/auth.middleware");

const { 
    getPC,
    postPC,
    getPCList,
} = require('../controllers/progContest.controller');

router.get("/register", ensureAuthenticated, addUserData, getPC);
router.post("/register", ensureAuthenticated, addUserData, postPC);
router.get("/list", ensureAuthenticated, addUserData, getPCList);

module.exports = router;