const pool = require("../db/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")

exports.signup = (req,res)=>{
    const userInfo = req.body
    const findDupUsername = 'SELECT * FROM users WHERE username = $1'
    pool.query(findDupUsername, [userInfo.username], (error, results) => {
        if (error) {
            return res.error_handler(error)
        }

        if(results?.rowCount !== 0){
            return res.error_handler("username is taken, choose another")
        }

        const hashedPassword = bcrypt.hashSync(userInfo.password, 10)
        const insertUserSql = "INSERT INTO users (username, password) VALUES ($1, $2)"

        pool.query(insertUserSql, [userInfo.username, hashedPassword], (error, results)=>{
            if (error) {
                return res.error_handler(error)
            }
            if(results?.rowCount !== 1){
                return res.error_handler("reg failed")
            }
            return res.error_handler("reg success", 0)
        })

    })
}

exports.login = (req,res)=>{
    const userInfo = req.body
    const findUserSql = "SELECT * FROM users WHERE username = $1"
    pool.query(findUserSql, [userInfo.username], (error, results)=>{
        if (error) {
            return res.error_handler(error)
        }
        if(results?.rowCount !== 1){
            return res.error_handler("login failed")
        }
        const passwordValid = bcrypt.compareSync(userInfo.password, results.rows[0].password)
        if(!passwordValid){
            return res.error_handler("username and password don't match")
        }

        const user = {...results.rows[0], password: "", user_pic: ""}
        const token = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})

        return res.send({
            status: 0,
            message: "login success",
            token: "Bearer " + token
        })
    })
}
