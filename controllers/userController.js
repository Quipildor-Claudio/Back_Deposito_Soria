const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userController = {

        // Registrar un usuario
        registerUser: async (req, res) => {
            const { username, password, email, name, isActive, role, service } = req.body;

    
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
    
                const newUser = new User({ username, password: hashedPassword, email, name, isActive, role, service });

                console.log(newUser);
                await newUser.save();
    
                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            } catch (error) {
                res.status(500).json({ error: 'Error al registrar usuario' });
            }
        },
        loginUser: async (req, res) => {
            const { username, password } = req.body;
            try {
                const user = await User.findOne({ username });
                if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });
    
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
                res.json({ token });
            } catch (error) {
                res.status(500).json({ error: 'Error al iniciar sesión' });
            }
        },
    

    getAll: async (req, res) => {
        try {
            const items = await User
                .find()
                .populate('service')
                .populate('role');
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await User.findById(req.params.id);
            if (item == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const deletedItem = await User.findByIdAndDelete(req.params.id);
            if (deletedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

module.exports = userController;