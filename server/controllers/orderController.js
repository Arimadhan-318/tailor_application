import { Order, Customer, Tailor } from '../models/index.js';
import mongoose from '../config/database.js';

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const formatOrder = (orderDoc) => {
  if (!orderDoc) return null;
  const order = orderDoc.toObject({ virtuals: true });

  if (order.customerId && typeof order.customerId === 'object' && order.customerId.name !== undefined) {
    order.Customer = order.customerId;
    order.customerId = order.customerId.id;
  }

  if (order.tailorId && typeof order.tailorId === 'object' && order.tailorId.name !== undefined) {
    order.Tailor = order.tailorId;
    order.tailorId = order.tailorId.id;
  }

  if (order.customerId && typeof order.customerId === 'object') {
    order.customerId = order.customerId.toString();
  }

  if (order.tailorId && typeof order.tailorId === 'object') {
    order.tailorId = order.tailorId.toString();
  }

  return order;
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { customerId, dressType, tailorId, givenDate, deliveryDate, notes } = req.body;

    // Validate required fields
    if (!customerId || !dressType || !tailorId || !givenDate || !deliveryDate) {
      return res.status(400).json({
        message: 'Missing required fields: customerId, dressType, tailorId, givenDate, deliveryDate'
      });
    }

    // Check if customer exists
    if (!isValidId(customerId) || !isValidId(tailorId)) {
      return res.status(400).json({
        message: 'Invalid customerId or tailorId'
      });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if tailor exists
    const tailor = await Tailor.findById(tailorId);
    if (!tailor) {
      return res.status(404).json({ message: 'Tailor not found' });
    }

    const order = await Order.create({
      customerId,
      dressType,
      tailorId,
      givenDate,
      deliveryDate,
      notes,
      status: 'Pending'
    });

    const populatedOrder = await Order.findById(order.id)
      .populate('customerId', 'name phone address')
      .populate('tailorId', 'name phone');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: formatOrder(populatedOrder)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// Get all orders with related customer and tailor details
export const getOrders = async (req, res) => {
  try {
    const { status, tailorId } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (tailorId) {
      if (!isValidId(tailorId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid tailor ID'
        });
      }
      filter.tailorId = tailorId;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate('customerId', 'name phone address')
      .populate('tailorId', 'name phone');

    res.status(200).json({
      success: true,
      data: orders.map(formatOrder)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    const order = await Order.findById(id)
      .populate('customerId', 'name phone address')
      .populate('tailorId', 'name phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: formatOrder(order)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, deliveryDate, notes } = req.body;
    const allowedStatuses = ['Pending', 'In Progress', 'Completed', 'Delivered'];

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    if (deliveryDate && Number.isNaN(new Date(deliveryDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid deliveryDate'
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const updatePayload = {};
    if (status) updatePayload.status = status;
    if (deliveryDate) updatePayload.deliveryDate = deliveryDate;
    if (notes !== undefined) updatePayload.notes = notes;

    if (Object.keys(updatePayload).length > 0) {
      await order.updateOne(updatePayload);
    }

    const updatedOrder = await Order.findById(id)
      .populate('customerId', 'name phone address')
      .populate('tailorId', 'name phone');

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: formatOrder(updatedOrder)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    const completedOrders = await Order.countDocuments({ status: 'Completed' });
    const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });

    const ordersByTailorAgg = await Order.aggregate([
      {
        $group: {
          _id: '$tailorId',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'tailors',
          localField: '_id',
          foreignField: '_id',
          as: 'tailor'
        }
      },
      {
        $unwind: {
          path: '$tailor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          tailorId: '$_id',
          count: 1,
          Tailor: {
            name: '$tailor.name',
            id: { $toString: '$tailor._id' }
          }
        }
      }
    ]);

    const tailorStats = ordersByTailorAgg.map((item) => ({
      tailorId: item.tailorId ? item.tailorId.toString() : '',
      Tailor: item.Tailor?.name ? item.Tailor : null,
      count: item.count
    }));

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        completedOrders,
        deliveredOrders,
        ordersByTailor: tailorStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};
