const express = require("express");
const joi = require("joi");
const { expressjwt: jwt } = require("express-jwt");
const userRouter = require("./routes/user");
const propertyRouter = require("./routes/property");
const config = require("./config");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.error_handler = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

app.use(
  jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/user|^\/property\/getPropertiesByStatus|^\//],
  })
);

app.use("/user", userRouter);
app.use("/property", propertyRouter);

app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.error_handler(err);
  }
  if (err.name === "UnauthorizedError") {
    return res.error_handler("Unauthorized");
  }
  return res.error_handler(err);
});

app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
