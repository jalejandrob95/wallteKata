const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wallet API",
      version: "1.0.0",
    },
  },
  apis: ["src/v1/routes/*.js", "src/database/*.js"],
};

const specs = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  console.log(`📚 api docs running  http://localhost:${port}/api-docs`);
};

module.exports = { swaggerDocs };
