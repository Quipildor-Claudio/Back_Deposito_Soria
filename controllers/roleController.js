const Role = require('../models/Role');
var roleController = {

    getAll: async (req, res) => {
        try {
            const items = await Role.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await Role.findById(req.params.id);
            if (item == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    save: async (req, res) => {
        try {
            const item = new Role(req.body);
            const savedItem = await item.save();
            res.status(201).json(savedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deletedItem = await Role.findByIdAndDelete(req.params.id);
            if (deletedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

module.exports = roleController;