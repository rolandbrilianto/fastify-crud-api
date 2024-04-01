const Product = require("../models/product.model");

const getProducts = async (request, reply) => {
  try {
    const products = await Product.find();
    reply.status(200).send(products);
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};

const getSingleProduct = async (request, reply) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);
    reply.status(200).send(product);
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};

const addProduct = async (request, reply) => {
  try {
    const product = await Product.create(request.body);
    reply.status(201).send(product);
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};

const updateProduct = async (request, reply) => {
  try {
    const { id } = request.params;
    const product = await Product.findByIdAndUpdate(id, request.body);

    if (!product) {
      return reply.status(404).send({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    reply.status(200).send(updatedProduct);
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (request, reply) => {
  try {
    const { id } = request.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return reply.status(404).send({ message: "Product not found" });
    }
    reply.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
