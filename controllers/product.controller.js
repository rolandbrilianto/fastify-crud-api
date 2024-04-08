const Product = require("../models/product.model");

const getProducts = async (request, reply) => {
  //BELOM KELAR, harus mapping array nya filter yang mau diambil
  try {
    const products = await Product.find();

    const modifyProduct = (product) => {
      // Buat objek baru dengan properti yang diinginkan
      return {
        id: product._id, // Ubah _id menjadi id
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    };

    const productsResponse = products.map((newProducts) => {
      delete newProducts.__v;
      return modifyProduct(newProducts);
    });

    reply.status(200).send({
      status: 200,
      success: true,
      message: "Data sukses diambil",
      data: productsResponse,
    });
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};

const getSingleProduct = async (request, reply) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);

    const productResponse = {
      id: product._id, // Ubah _id menjadi id
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    reply.status(200).code(200).send({
      status: 200,
      success: true,
      message: "Data sukses diambil",
      data: productResponse,
    });
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};

const addProduct = async (request, reply) => {
  try {
    const product = await Product.create(request.body);
    const productResponse = {
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      createdAt: product.createdAt,
    };
    if (product.image) {
      productResponse.image = product.image;
    }
    reply.status(201).code(201).send({
      status: 201,
      success: true,
      message: "Data berhasil ditambahkan",
      data: productResponse,
    });
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
