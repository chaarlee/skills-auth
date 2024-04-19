const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const PORT = process.env.PORT || 4321;
const HOST = process.env.HOST || "localhost";

const doc = {
  info: {
    title: "Skills Auth API",
    description: "This is a helper API for Skills Auth",
  },
  host: `${HOST}:${PORT}`,
  "@definitions": {
    /**
  {
    "status": "UP"
  }
     */
    health: {
      type: "object",
      properties: {
        status: {
          type: "string",
          description: "The status of the service",
        },
      },
    },
    ping: {
      type: "string",
      description: "pong",
    },
    login: {
      type: "object",
      properties: {
        payload: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "name of the user",
            },
            role: {
              type: "string",
              description: "role of the user",
            },
          },
        },
        token: {
          type: "string",
          description: "base64 encoded token",
        },
      },
    },
  },
  definitions: {
    players: [{ $ref: "#/definitions/login" }],
  },
};

const outputFile = "./skills-auth.openapi.json";
const routes = ["../../index.js"];

swaggerAutogen(outputFile, routes, doc);
