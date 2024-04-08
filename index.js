const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const fastifyFormBody = require("@fastify/formbody");
require("dotenv").config();
fastify.register(fastifyFormBody);

fastify.get("/", (req, reply) => {
  reply.send({
    status: "ok health check",
  });
});
fastify.register(productRoutes, { prefix: "/api/products" });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB!");
    fastify
      .listen({ host: process.env.HOST, port: process.env.PORT })
      // .listen({ port: process.env.PORT })
      .then(() => {
        console.log(
          `server is active on port ${fastify.server.address().port}`
        );
      })
      .catch((err) => {
        console.log(process.env.PORT);
        fastify.log.error(err);
        process.exit(1);
      });
  })
  .catch(() => {
    console.log("Could not connect to DB!");
    console.log(process.env.PORT);
  });
