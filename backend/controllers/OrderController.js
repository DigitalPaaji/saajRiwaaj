const Order = require("../models/OrderModel");

// USER: Place an order
const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, amount } = req.body;
    const userId = req.user._id;

    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      amount,
      paymentStatus: paymentMethod === "COD" ? "paid" : "pending",
      orderStatus: "placed"
    });

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "Order placement failed" });
  }
};

// USER: Get all orders by user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// USER: cancel order (only if not shipped)
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.orderStatus === "placed") {
      order.orderStatus = "cancelled";
      await order.save();
      return res.status(200).json({ message: "Order cancelled", order });
    } else {
      return res.status(400).json({ message: "Order cannot be cancelled now" });
    }
  } catch (err) {
    res.status(500).json({ message: "Cancellation failed" });
  }
};

// ADMIN: get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("userId");
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ADMIN: update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = req.body.orderStatus; // e.g. shipped/delivered
    await order.save();
    res.status(200).json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
