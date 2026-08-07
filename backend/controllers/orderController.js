

// import Order from '../models/Order.js';

// export const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const createOrder = async (req, res) => {
//   try {
//     const orderData = req.body;
    
//     // Generate unique order ID using timestamp + random digits
//     if (!orderData.id) {
//       orderData.id = '#' + Date.now().toString().slice(-6);
//     }
    
//     if (!orderData.date) {
//       orderData.date = new Date().toISOString().split('T')[0];
//     }

//     const order = await Order.create(orderData);
//     res.status(201).json({ success: true, data: order });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const updateOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findOneAndUpdate({ id }, req.body, { new: true });
//     if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
//     res.status(200).json({ success: true, data: order });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const deleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findOneAndDelete({ id });
//     if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
//     res.status(200).json({ success: true, message: 'Order deleted' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };





// import mongoose from 'mongoose';
// import Order from '../models/Order.js';

// // Get all orders from MongoDB
// export const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       data: orders
//     });
//   } catch (error) {
//     console.error("Error getting orders:", error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while fetching orders'
//     });
//   }
// };

// // Create a new order
// export const createOrder = async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(201).json({
//       success: true,
//       data: savedOrder
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while creating order'
//     });
//   }
// };

// // Update order status in MongoDB
// export const updateOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const allowedStatuses = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid status value'
//       });
//     }

//     // Searches by custom 'id' (e.g. #147265) or MongoDB '_id'
// //     const updatedOrder = await Order.findOneAndUpdate(
// //       { $or: [{ id: id }, { _id: id }] },
// //       { status: status },
// //       { new: true }
// //     );

// //     if (!updatedOrder) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Order not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: `Order status updated to ${status} in database`,
// //       data: updatedOrder
// //     });
// //   } catch (error) {
// //     console.error("Error updating order status:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server error while updating status'
// //     });
// //   }
// // };





// export const updateOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const allowedStatuses = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({ success: false, message: 'Invalid status value' });
//     }

//     // Build flexible query to match either MongoDB _id or custom id field
//     let query = { id: id };
//     if (mongoose.Types.ObjectId.isValid(id)) {
//       query = { $or: [{ _id: id }, { id: id }] };
//     }

//     const updatedOrder = await Order.findOneAndUpdate(
//       query,
//       { status: status },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found in database'
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Status updated successfully',
//       data: updatedOrder
//     });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     return res.status(500).json({
//       success: false,
//       message: 'Server error while updating status'
//     });
//   }
// };







// // Delete an order
// export const deleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Order.findOneAndDelete({ $or: [{ id: id }, { _id: id }] });
//     res.status(200).json({
//       success: true,
//       message: 'Order deleted successfully'
//     });
//   } catch (error) {
//     console.error("Error deleting order:", error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while deleting order'
//     });
//   }
// };








import mongoose from 'mongoose';
import Order from '../models/Order.js';

// Get all orders from MongoDB
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    if (!orderData.id) {
      orderData.id = '#' + Date.now().toString().slice(-6);
    }

    if (!orderData.date) {
      orderData.date = new Date().toISOString().split('T')[0];
    }

    const savedOrder = await Order.create(orderData);
    res.status(201).json({
      success: true,
      data: savedOrder
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
};

// Update order status in MongoDB
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    // Match either standard MongoDB _id or custom id string
    let query = { id: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { id: id }] };
    }

    const updatedOrder = await Order.findOneAndUpdate(
      query,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found in database'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating status'
    });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    let query = { id: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { id: id }] };
    }

    const deletedOrder = await Order.findOneAndDelete(query);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting order'
    });
  }
};