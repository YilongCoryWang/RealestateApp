const bcrypt = require("bcryptjs");
const pool = require("../db/index");

exports.getProperties = (_req, res) => {
  const getPropertiesSql =
    "SELECT id, address, city, price, status FROM properties order by id asc";
  pool.query(getPropertiesSql, (err, results) => {
    if (err) {
      return res.error_handler(err);
    }
    res.send({
      status: 0,
      message: "success",
      data: results.rows,
    });
  });
};

exports.getPropertiesByStatus = (req, res) => {
  const getPropertiesSql =
    "SELECT id, address, city, price, image, status FROM properties WHERE status=$1 order by id asc";
  pool.query(getPropertiesSql, [req.params.status], (err, results) => {
    if (err) {
      return res.error_handler(err);
    }
    res.send({
      status: 0,
      message: "success",
      data: results.rows,
    });
  });
};

exports.getPropertyDetails = (req, res) => {
  const getPropertiesSql = "SELECT * FROM properties WHERE id=$1";
  pool.query(getPropertiesSql, [req.params.id], (err, results) => {
    if (err) {
      return res.error_handler(err);
    }
    if (results.rowCount !== 1)
      return res.error_handler("get property details failed");
    res.send({
      status: 0,
      message: "success",
      data: results.rows[0],
    });
  });
};

exports.updatePropertyDetails = (req, res) => {
  const {
    id,
    address,
    city,
    state,
    postcode,
    description,
    price,
    area,
    bedroom,
    bathroom,
    carpark,
    status,
  } = req.body;
  const updatePropertySql =
    "UPDATE properties SET address=$2, city=$3, state=$4, postcode=$5, description=$6, price=$7, area=$8, bedroom=$9, bathroom=$10, carpark=$11, status=$12 WHERE id=$1";
  pool.query(
    updatePropertySql,
    [
      id,
      address,
      city,
      state,
      postcode,
      description,
      price,
      area,
      bedroom,
      bathroom,
      carpark,
      status,
    ],
    (err, results) => {
      if (err) return res.error_handler(err);
      if (results.rowCount !== 1) return res.error_handler("update fail");
      res.send({
        status: 0,
        message: "success",
        data: "updated",
      });
    }
  );
};

exports.addPropertyDetails = (req, res) => {
  const {
    address,
    city,
    state,
    postcode,
    description,
    price,
    area,
    bedroom,
    bathroom,
    carpark,
    status,
  } = req.body;
  const addPropertySql =
    "INSERT INTO properties (address, city, state, postcode, description, price, area, bedroom, bathroom, carpark, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
  pool.query(
    addPropertySql,
    [
      address,
      city,
      state,
      postcode,
      description,
      price,
      area,
      bedroom,
      bathroom,
      carpark,
      status,
    ],
    (err, results) => {
      if (err) return res.error_handler(err);
      if (results.rowCount !== 1) return res.error_handler("add fail");
      res.send({
        status: 0,
        message: "success",
        data: "added",
      });
    }
  );
};

exports.deletePropertyDetails = (req, res) => {
  const deletePropertiesSql = "DELETE FROM properties WHERE id=$1";
  pool.query(deletePropertiesSql, [req.params.id], (err, results) => {
    if (err) {
      return res.error_handler(err);
    }
    if (results.rowCount !== 1) return res.error_handler("property not found");
    res.send({
      status: 0,
      message: "success",
      data: results.rows,
    });
  });
};
