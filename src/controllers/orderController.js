const mongoose = require('mongoose');
const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, status } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one product' });
    }

    const normalizedProducts = products.map((item) => ({
      product: item.product,
      quantity: item.quantity || 1,
    }));

    const order = await Order.create({
      user: req.user.id,
      products: normalizedProducts,
      totalAmount: totalAmount || 0,
      status: status || 'pending',
    });

    const populatedOrder = await order.populate('user', 'name email role');
    await populatedOrder.populate('products.product', 'name price');

    return res.status(201).json(populatedOrder);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const query = req.user.role === 'user' ? { user: req.user.id } : {};

    const orders = await Order.find(query)
      .populate('user', 'name email role')
      .populate('products.product', 'name price');

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(id)
      .populate('user', 'name email role')
      .populate('products.product', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role === 'user' && order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: you can only view your own orders' });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
