const Order = require("../models/OrderModel");
const User = require("../models/UserModel");

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

    await User.findByIdAndUpdate(userId, { $set: { cart: [] } });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ message: "Server Error" });
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

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email phone address")
      .populate("items.product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Normalize phone field (fallback for old docs)
    const userPhone = order.userId?.phone || order.userId?.address?.phone || "";

    res.status(200).json({ order: { ...order.toObject(), userPhone } });
  } catch (err) {
    console.error("Get order by ID error:", err);
    res.status(500).json({ message: "Failed to fetch order" });
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
  getOrderById,
  updateOrderStatus,
};
