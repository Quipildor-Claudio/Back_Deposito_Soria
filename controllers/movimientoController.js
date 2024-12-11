const Movimiento = require('../models/Movimiento');


var movimientoController = {

    getAllPag: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 50;
            const skip = (page - 1) * limit;

            const items = await Movimiento.find()
                .populate('user')
                .populate('service')
                .sort({ _id: -1 })
                .skip(skip).limit(limit);
            const totalItems = await Movimiento.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);
            res.json({
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
            const items = await Movimiento.find()
                .populate('user')
                .populate('service')
                .sort({ _id: -1 });
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await Movimiento.findById(req.params.id)
                .populate('user')
                .populate('service');
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
            const item = new Movimiento(req.body);
            console.log(item);
            const savedItem = await item.save();
            res.status(201).json(savedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedItem = await Movimiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
            const deletedItem = await Movimiento.findByIdAndDelete(req.params.id);
            if (deletedItem == null) {
                return res.status(404).json({ message: 'Item no encontrado' });
            }
            res.json({ message: 'Item eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    findMovementsByDateRange: async (req, res) => {
        const { startDate, endDate } = req.query;
        console.log(req.query);
        try {
            // Validar que ambas fechas existan
            if (!startDate || !endDate) {
                return res.status(400).json({ error: 'Debe proporcionar startDate y endDate.' });
            }

            // Validar formato de las fechas
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
                return res.status(400).json({ error: 'Las fechas deben estar en formato YYYY-MM-DD.' });
            }

            // Buscar movimientos dentro del rango
            const movements = await Movimiento.find({
                date: { $gte: startDate, $lte: endDate },
            }).populate('service').populate('user');

            return res.status(200).json(movements);
        } catch (error) {
            console.error('Error al buscar movimientos:', error.message);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },
    getMovementsByProductAndDateRange: async (productId, startDate, endDate) => {
        try {
            // Validar que las fechas estén en formato correcto
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
                throw new Error('Las fechas deben estar en formato YYYY-MM-DD.');
            }

            // Buscar movimientos que incluyan el producto y estén en el rango de fechas
            const movements = await Movement.find({
                date: { $gte: startDate, $lte: endDate },
                comprobantes: {
                    $elemMatch: {
                        'product._id': mongoose.Types.ObjectId(productId),
                    },
                },
            }).populate('user').populate('service');

            return movements;
        } catch (error) {
            console.error('Error al obtener movimientos:', error.message);
            throw error;
        }
    },
    getMovementsByServiceAndDateRange: async (serviceId, startDate, endDate) => {
        try {
            // Validar que las fechas estén en formato correcto
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
                throw new Error('Las fechas deben estar en formato YYYY-MM-DD.');
            }

            // Buscar movimientos que incluyan el servicos y estén en el rango de fechas
            const movements = await Movement.find({
                date: { $gte: startDate, $lte: endDate },
                comprobantes: {
                    $elemMatch: {
                        'product.service': mongoose.Types.ObjectId(serviceId),
                    },
                },
            }).populate('user').populate('service');

            return movements;
        } catch (error) {
            console.error('Error al obtener movimientos:', error.message);
            throw error;
        }
    }


}

module.exports = movimientoController;

