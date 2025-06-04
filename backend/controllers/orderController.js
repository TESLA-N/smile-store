import Order from "../models/orderModel.js";
import Address from "../models/addressModel.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderItems, paymentMethod, totalAmount, shippingAddressId } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    let shippingAddress;

    if (shippingAddressId) {
      // Use the provided address
      const address = await Address.findOne({ _id: shippingAddressId, user: userId });
      if (!address) {
        return res.status(400).json({ message: "Invalid shipping address" });
      }
      shippingAddress = {
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      };
    } else {
      // Use default address
      const defaultAddress = await Address.findOne({ user: userId, isDefault: true });
      if (!defaultAddress) {
        return res.status(400).json({ message: "Default shipping address not found" });
      }
      shippingAddress = {
        addressLine: defaultAddress.addressLine,
        city: defaultAddress.city,
        state: defaultAddress.state,
        postalCode: defaultAddress.postalCode,
        country: defaultAddress.country,
      };
    }

    const newOrder = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all orders for logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order by ID (only for the user who owns it)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("orderItems.product", "name image price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Check if order belongs to user or user is admin (assuming req.user.isAdmin exists)
    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status and payment status (Admin or user can update delivery or cancellation status)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, deliveredAt } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // User must own the order or be admin (add your auth logic accordingly)
    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to update this order" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (deliveredAt) order.deliveredAt = deliveredAt;

    if (orderStatus === "Delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
      order.isDelivered = true;
    }

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all orders (with pagination optional)
export const getAllOrders = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Order.countDocuments();
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
