const Product = require("../models/product.model");

const getProducts = async (request, reply) => {
  //pagination
  const page = parseInt(request.query.page) || 1; // Nomor halaman, default 1
  const limit = parseInt(request.query.limit) || 25; // Jumlah item per halaman, default 10

  //BELOM KELAR, harus mapping array nya filter yang mau diambil
  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = await Product.countDocuments();

    const totalPages = Math.ceil(totalItems / limit);

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
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
      },
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
      id: product._id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
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
      return reply
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    const productResponse = {
      id: updatedProduct._id,
      name: updatedProduct.name,
      quantity: updatedProduct.quantity,
      price: updatedProduct.price,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    };

    reply.status(200).send({
      success: true,
      message: "data berhasil di ubah",
      data: productResponse,
    });
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (request, reply) => {
  try {
    const { id } = request.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return reply
        .status(404)
        .send({ success: false, message: "Product not found" });
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
