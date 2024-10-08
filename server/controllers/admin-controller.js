const User = require("../models/user-model");
const Contact = require("../models/contact-model");
 
const getAllUsers = async(req , res) => {
    try {
        const users = await User.find({}, {password:0})
        console.log(users);
        if(!users  || !users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json( users );
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async(req , res , next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if(!contacts  ||!contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }
        return res.status(200).json( contacts );
    } catch (error) {
        next(error);
    }
};

const deleteuserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error in deleteuserById:', error);
        next(error); 
    }
};

const updateuserById = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Validate input data
      if (!updateData.username || !updateData.email || !updateData.phone) {
        return res.status(400).json({ message: "Invalid input data" });
      }
  
      // Find and update the user
      const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id } , {password:0});
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in deleteuserById:', error);
        next(error); 
    }
};

const deletecontactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error('Error in deletecontactById:', error);
        next(error); 
    }
};
 

module.exports = { getAllUsers , getAllContacts , deleteuserById , getUserById , updateuserById , deletecontactById };