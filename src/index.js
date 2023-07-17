require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

//local middlewares
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const handleError = require("./middlewares/customError");

//database
const { connect } = require("./database/db");

//routes
const routesApi = require("./v1/routes");

const app = express();
//database
connect();

const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes
routesApi(app);

//local middlewares
//handle error
app.use(handleError);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}`);
  V1SwaggerDocs(app, PORT);
});

module.exports = app;
