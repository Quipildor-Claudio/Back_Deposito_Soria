const Movimiento = require('../models/Movimiento');
const Service = require('../models/Service');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const NumberToWordsService = require('../models/NumberToWordsService');
const mongoose = require('mongoose');

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
            console.log(movements);
            return res.status(200).json(movements);
        } catch (error) {
            console.error('Error al buscar movimientos:', error.message);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },

    getMovementsByProductAndDateRange: async (req, res) => {
        const { startDate, endDate, productCode } = req.query;
        console.log(productCode, startDate, endDate);
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
                'comprobantes.product.code': productCode,
            }).populate('service');
            console.log(movements);
            return res.status(200).json(movements);
        } catch (error) {
            console.error('Error al buscar movimientos:', error.message);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },

    getMovementsByServiceAndDateRange: async (req, res) => {
        const { startDate, endDate, serviceId } = req.query;
        console.log("---------------Servicio------------------");
        console.log(startDate, endDate, serviceId);
        const objectId = mongoose.Types.ObjectId.isValid(serviceId)
            ? new mongoose.Types.ObjectId(serviceId)
            : null;
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
                'service': serviceId,
            }).populate('service').populate('user');
            console.log(movements);
            return res.status(200).json(movements);
        } catch (error) {
            console.error('Error al buscar movimientos:', error.message);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },
    generatePdf: async (req, res) => {
        try {
            // Consultar el movimiento por ID
            const movement = await Movimiento.findById(req.params.id).populate('user').populate('service');
            const item = await Service.findById(movement.user.service);
            //console.log(item);
            if (!movement) {
                return res.status(404).send('Movimiento no encontrado');
            }

            // Generar contenido HTML dinámico
            const htmlContent = `
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; margin: 0; padding: 0;  font-size: 10;}
                  .container { display: flex; flex-direction: row; width: 100%; height: 100%; }
                  .section { width: 50%; padding: 20px; box-sizing: border-box; border-right: 1px solid #ddd; }
                  .section:last-child { border-right: none; }
                  h1, h2, h3 { text-align: center; }
                  table { width: 100%; border-collapse: collapse; margin-top: 5px; }
                  table, th, td { border: 1px solid black; }
                  th, td { padding: 2px; text-align: left; }
                  .signatures { display: flex; justify-content: space-between; margin-top: 15px;  }
                  .signature { text-align: center; }
                  .signature div { border-top: 1px solid black; margin-top: 20px; }
                  .p{  margin: 0; padding: 0;}
                  table p { margin: 0; padding: 0; font-size: 10;}
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="section">
                    ${generateMovementHTML(movement, 'Original', item.name)}
                  </div>
                  <div class="section">
                    ${generateMovementHTML(movement, 'Duplicado', item.name)}
                  </div>
                </div>
              </body>
            </html>`;

            // Iniciar Puppeteer y generar el PDF
            const browser = await puppeteer.launch({
                headless: true, // Es necesario para servidores
                args: ['--no-sandbox', '--disable-setuid-sandbox'], // Opciones para evitar problemas de permisos
            });
            const page = await browser.newPage();
            await page.setContent(htmlContent);

            const filePath = path.resolve(__dirname, `movement-${movement._id}.pdf`);
            await page.pdf({ path: filePath, format: 'A4', printBackground: true });

            await browser.close();

            // Enviar el PDF como respuesta
            res.download(filePath, `movement-${movement._id}.pdf`, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error al descargar el PDF');
                } else {
                    // Eliminar el archivo después de enviarlo
                    fs.unlinkSync(filePath);
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al generar el PDF');
        }

    }


}
function generateMovementHTML(movement, text, service) {
    const serviceNumver = new NumberToWordsService();
    const letra = serviceNumver.convertNumberToWords(movement.total);
    const isOut = movement.type === 'OUT'; // Verificar si el tipo es OUT
    return `
      <table>
      <tbody>
      <tr>
      <td >
      <p style="font-size: 15;"><strong>Hospital Pablo Soria</strong></p>
      <p style="font-size: 12;" ><strong> ${service || 'No registrada'} </strong> </p>
      <p><strong>Usuario:</strong> ${movement.user?.name || 'No registrado'}</p>
      <p>${text}</p>
      </td>
      <td>
      <p><strong>Fecha:</strong> ${movement.date}</p>
      <p><strong>Hora:</strong> ${movement.hora || 'No registrada'}</p>  
      ${!isOut ? `<p><strong>Proveedor:</strong> ${movement.proveedor || 'No registrado'}</p>` : `</br>`}
      ${!isOut ? `<p><strong>Remito:</strong> ${movement.remito || 'No registrado'}</p>` : `</br>`}
      ${!isOut ? `<p><strong>Orden de Compra:</strong> ${movement.compra || 'No registrada'}</p>` : ''}
      ${!isOut ? `<p><strong>Expediente:</strong> ${movement.expediente || 'No registrado'}</p>` : ''}
      </td>
      </tr>
      <tr>
      <td colspan="2">
      <p><strong>Detalle del Movimiento</strong></p>
      <p><strong>Código:</strong> ${movement.code}</p>
      ${isOut ? `<p><strong>Servicio:</strong> ${movement.service.name || 'No registrado'}</p>` : ''}
      <p><strong>Tipo:</strong> ${movement.type === 'IN' ? 'Ingreso' : 'Egreso'}</p>
      <p><strong>Observación:</strong> ${movement.observacion}</p>
      </td>
      </tr>
      </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th><p><strong>Cod.</p></strong></th>
            <th><p><strong>Artículo</p></strong></th>
            <th><p><strong>U.M.</p></strong></th>
            <th><p><strong>Cantidad</p></strong></th>
          </tr>
        </thead>
        <tbody>
          ${movement.comprobantes.map(item => `
            <tr>
              <td><p><strong>${item.product?.code || '-'}</p></strong></td>
              <td><p><strong>${item.product?.name || '-'}</p></strong></td>
              <td><p><strong>${item.product?.unidad?.name || '-'}</p></strong></td>
              <td><p><strong>${item.cantidad}</p></strong></td>
            </tr>`).join('')}
        </tbody>
      </table>
      <tbody>
         <tr>
            ${!isOut ? `<p><strong>Total: $</strong> ${movement.total || '0.00'}</p>` : ''}
            ${!isOut ? `<p><strong>${letra}</strong></p>` : ''}
         </tr>
      </tbody>
      <table>
      </table>
      <div class="signatures">
        <div class="signature">
        ${isOut ? '<div>Firma Entrega</div>' : '<div>Firma Proveedor</div>'}
        </div>
        <div class="signature">
          <div>Firma Recepción</div>
        </div>
      </div>`;

}

module.exports = movimientoController;

