const {registerHandler,loginHandler, getProfileHandler, logoutHandler, fetchLeaderBoardHandler}=require("../controllers/userController")
const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", registerHandler);
router.post("/login",loginHandler);
router.get("/me",isAuthenticated,getProfileHandler)
router.get("/logout",isAuthenticated,logoutHandler);
router.get("/leaderboard",fetchLeaderBoardHandler);

module.exports = router;