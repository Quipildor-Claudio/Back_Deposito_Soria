const Producto = require('../models/Producto');
var productoController = {

    getAllPag: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 50;
            const skip = (page - 1) * limit;

            const items = await Producto.find()
                .populate('marca')
                .populate('tipo')
                .populate('unidad')
                .sort({ _id: -1 })
                .skip(skip).limit(limit);
            const totalItems = await Producto.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);

            res.json({
                //  items: items.reverse(), 
                items,
                totalItems,
                totalPages,
                currentPage: page
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

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
            const deletedItem = await Producto.findByIdAndDelete(req.params.id);
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
    getProductoByCode: async (req, res) => {
        try {
            const { code } = req.params;
            const item = await Producto.find({ code: code })
                .populate('marca')
                .populate('tipo')
                .populate('unidad')

            if (item == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json(item[0]);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },


    // Buscar productos por nombre
    getProductoByName: async (req, res) => {
        try {
            const { name } = req.query;
            const productos = await Producto.find({ name: new RegExp(name, 'i') })
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
    },

    obtenerProductosModificadosSinStock : async (req, res) => {
        try {
            const fechaLimite = new Date();
            fechaLimite.setDate(fechaLimite.getDate() - 90); // Últimos 30 días
    
            const productos = await Producto.find({
                updatedAt: { $gte: fechaLimite },  // Filtra productos modificados recientemente
                stock: { $lte: 10 }                // Stock menor o igual a 10
            }).populate('marca tipo unidad');      // Cargar datos relacionados
    
            res.status(200).json({
                success: true,
                productos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los productos',
                error: error.message
            });
        }
    },
    getProductosConStock : async (req, res) => {
        try {
            const productos = await Producto.find({ stock: { $gt: 0 } }); // Filtrar productos con stock > 0
            res.status(200).json(productos); // Responder con la lista de productos
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos con stock', error });
        }
    }


}

module.exports = productoController;