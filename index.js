const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
fastify.register(require("@fastify/formbody"), {
  contentTypes: {
    urlencoded: ["application/x-www-form-urlencoded"],
  },
});
fastify.register(productRoutes, { prefix: "/api/products" });

mongoose
  .connect(
    "mongodb+srv://rolandbrilianto:Kipasangin_1@backenddb.09eeper.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to DB!");
    fastify
      .listen({ port: 3000 })
      .then(() => {
        console.log("server is active on port 3000");
      })
      .catch((err) => {
        fastify.log.error(err);
        process.exit(1);
      });
  })
  .catch(() => {
    console.log("Could not connect to DB!");
  });