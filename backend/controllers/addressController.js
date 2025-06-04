import Address from "../models/addressModel.js";

// Get all addresses for the user
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressLine, city, state, postalCode, country, isDefault } = req.body;

    // Check duplicate address for user
    const duplicate = await Address.findOne({
      user: userId,
      addressLine,
      city,
      state,
      postalCode,
      country,
    });

    if (duplicate) {
      return res.status(400).json({ message: "Address already exists" });
    }

    const existingAddresses = await Address.find({ user: userId });

    let defaultFlag = isDefault;
    if (existingAddresses.length === 0) {
      defaultFlag = true;
    } else if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    } else {
      defaultFlag = false;
    }

    const newAddress = new Address({
      user: userId,
      addressLine,
      city,
      state,
      postalCode,
      country,
      isDefault: defaultFlag,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update address
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user._id });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Only allow update of specific fields
    const allowedUpdates = ["addressLine", "city", "state", "postalCode", "country", "isDefault"];
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        address[key] = req.body[key];
      }
    }

    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    await address.save();
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete address
// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    // First, verify the address exists and belongs to the user
    const address = await Address.findOne({ _id: id, user: userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Count how many addresses the user has
    const totalAddresses = await Address.countDocuments({ user: userId });

    // Prevent deletion if it's the only one
    if (totalAddresses === 1) {
      return res.status(400).json({ message: "Cannot delete the only address. At least one address must remain." });
    }

    const wasDefault = address.isDefault;

    // Delete the address
    await address.deleteOne();

    // If the deleted address was default, set a new default address
    if (wasDefault) {
      const latestAddress = await Address.findOne({ user: userId }).sort({ createdAt: -1 });
      if (latestAddress) {
        latestAddress.isDefault = true;
        await latestAddress.save();
      }
    }

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Set as default
export const setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user._id });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await Address.updateMany({ user: req.user._id }, { isDefault: false });
    address.isDefault = true;
    await address.save();

    res.json({ message: "Default address set", address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
