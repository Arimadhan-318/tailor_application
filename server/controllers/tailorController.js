import { Tailor } from '../models/index.js';
import mongoose from '../config/database.js';

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new tailor
export const createTailor = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Tailor name is required' });
    }

    const tailor = await Tailor.create({
      name,
      phone
    });

    res.status(201).json({
      success: true,
      message: 'Tailor created successfully',
      data: tailor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating tailor',
      error: error.message
    });
  }
};

// Get all tailors
export const getTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: tailors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tailors',
      error: error.message
    });
  }
};

// Get tailor by ID
export const getTailorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tailor ID'
      });
    }

    const tailor = await Tailor.findById(id);

    if (!tailor) {
      return res.status(404).json({
        success: false,
        message: 'Tailor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tailor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tailor',
      error: error.message
    });
  }
};

// Update tailor
export const updateTailor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tailor ID'
      });
    }

    const tailor = await Tailor.findById(id);

    if (!tailor) {
      return res.status(404).json({
        success: false,
        message: 'Tailor not found'
      });
    }

    tailor.set({
      name: name || tailor.name,
      phone: phone || tailor.phone
    });

    await tailor.save();

    res.status(200).json({
      success: true,
      message: 'Tailor updated successfully',
      data: tailor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating tailor',
      error: error.message
    });
  }
};

// Delete tailor
export const deleteTailor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tailor ID'
      });
    }

    const tailor = await Tailor.findById(id);

    if (!tailor) {
      return res.status(404).json({
        success: false,
        message: 'Tailor not found'
      });
    }

    await tailor.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Tailor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting tailor',
      error: error.message
    });
  }
};
