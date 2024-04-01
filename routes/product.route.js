const productController = require("../controllers/product.controller.js");

const routes = async (fastify, options) => {
  fastify.get("/", productController.getProducts);

  fastify.get("/:id", productController.getSingleProduct);

  fastify.post("/", productController.addProduct);

  fastify.put("/:id", productController.updateProduct);

  fastify.delete("/:id", productController.deleteProduct);
};

module.exports = routes;
