const express = require("express");
const router = express.Router();
const {fetchUser} = require('../middleware/fetchUser.js')
const {placeOrder,usersOrders,listOrders,updateStatus} = require('../controllers/order-controller.js')

router.post("/place",fetchUser,placeOrder);
router.post("/myOrders",fetchUser,usersOrders);
router.get("/list",listOrders);
router.post("/status",updateStatus);

module.exports = router;