const express = require("express")
const expressJoi = require("@escook/express-joi")
const userHandler = require("../controllers/userController")
const {reg_login_schema} = require("../schema/user")

const router = express.Router()

router.post("/signup", expressJoi(reg_login_schema), userHandler.signup)
router.post("/login", expressJoi(reg_login_schema), userHandler.login)

module.exports = router