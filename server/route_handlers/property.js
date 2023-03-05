const bcrypt = require("bcryptjs")
const pool = require("../db/index")

exports.getPropertiesByStatus = (req, res)=>{
    const getPropertiesSql = "SELECT id, address, city, price, image FROM properties WHERE status=$1"
    pool.query(getPropertiesSql, [req.params.status], (err, results)=>{
        if(err) {
            return res.error_handler(err)
        }
        res.send({
            status: 0,
            message: "success",
            data: results.rows
        })
    })
}

exports.getPropertyDetails = (req, res)=>{
    const getPropertiesSql = "SELECT * FROM properties WHERE id=$1"
    pool.query(getPropertiesSql, [req.params.id], (err, results)=>{
        if(err) {
            return res.error_handler(err)
        }
        if(results.rowCount !== 1) return res.error_handler("get property details failed")
        res.send({
            status: 0,
            message: "success",
            data: results.rows[0]
        })
    })
}
