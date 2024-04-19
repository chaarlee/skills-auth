const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const tokenGenerator = require("./lib/tokenGenerator");

const users = require("./users");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openApiFile = "./tools/swagger/skills-auth.openapi.json";
if (fs.existsSync(openApiFile)) {
  const openApi = require(openApiFile);
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(openApi));

  app.get("/openapi.json", (req, res) => {
    // #swagger.produces = ['application/json']
    res.json(openApi);
  });
}

app.get("/", (req, res) => {
  // #swagger.produces = ['application/text']
  res.send("Hello Skills!");
});

app.get("/ping", (req, res) => {
  // #swagger.produces = ['application/text']
  res.send("pong");
});

app.get("/echo", (req, res) => {
  // #swagger.produces = ['application/json']
  res.json(req.query);
});

app.get("/health", (req, res) => {
  // #swagger.produces = ['application/json']
  res.json({ status: "UP" });
});

app.post("/login", async (req, res) => {
  // #swagger.produces = ['application/json']
  try {
    // console.log("req", req);
    const { username, password } = req.body;
    console.log({ ip: req.ip, body: req.body });

    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      const payload = {
        name: user.name,
        role: user.role,
      };
      const response = {
        payload: payload,
        token: tokenGenerator(payload),
      };
      console.log(response);
      res.json(response);
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
});

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
