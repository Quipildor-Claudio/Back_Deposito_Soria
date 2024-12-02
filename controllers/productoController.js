const Producto = require('../models/Producto');
var productoController = {

    getAll: async (req, res) => {
        try {
            const items = await Producto.find()
                .populate('marca')
                .populate('tipo')
                .populate('unidad')
                .limit(50);
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await Producto.findById(req.params.id);
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
            const item = new Producto(req.body);
            const savedItem = await item.save();
            res.status(201).json(savedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
            const deletedItem = await Servicio.findByIdAndDelete(req.params.id);
            if (deletedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getProductoById: async (req, res) => {
        try {
            const { id } = req.params;
            const productos = await Producto.find({ _id: new RegExp(`^${id}`, 'i') })
                .populate('marca')
                .populate('tipo')
                .populate('unidad')
                .limit(50);
            if (!productos) return res.status(404).json({ message: 'Producto no encontrado' });
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Buscar productos por nombre
    getProductoByName: async (req, res) => {
        try {
            const { name } = req.query;
            const productos = await Producto.find({ name: new RegExp(`^${name}`, 'i') })
                .populate('marca')
                .populate('tipo')
                .populate('unidad')
                .limit(20);
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    actulizarCant: async (req, res) => {
        const { comprobantes, type } = req.body; // Se esperan los comprobantes y el tipo ("IN" o "OUT")
    
        if (!type || !['IN', 'OUT'].includes(type)) {
            return res.status(400).send({ mensaje: 'Tipo de operación inválido (debe ser "IN" o "OUT")' });
        }
    
        try {
            for (const comprobante of comprobantes) {
                const ajuste = type === 'IN' ? comprobante.cantidad : -comprobante.cantidad;
    
                await Producto.updateOne(
                    { _id: comprobante.product._id }, // Busca el producto por su ID
                    { $inc: { stock: ajuste } } // Suma o resta dependiendo del tipo
                );
            }
    
            res.status(200).send({ mensaje: 'Stock actualizado correctamente' });
        } catch (error) {
            console.error('Error actualizando el stock:', error);
            res.status(500).send({ mensaje: 'Error actualizando el stock' });
        }
    }


}

module.exports = productoController;