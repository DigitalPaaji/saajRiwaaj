const router = require("express").Router();
const orderController = require("../controllers/OrderController");
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

// user routes
router.post("/", userAuth, orderController.placeOrder);
router.get("/my", userAuth, orderController.getUserOrders);
router.put("/cancel/:id", userAuth, orderController.cancelOrder);

// admin routes
router.get("/", adminAuth, orderController.getAllOrders);
router.put("/:id", adminAuth, orderController.updateOrderStatus);

module.exports = router;
