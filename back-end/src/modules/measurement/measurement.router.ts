import { Router } from 'express';
import MeasurementController from './measurement.controller';
import { bodyValiteMiddleware } from '@src/shared/middlewares';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

export const measurementRouter = Router();

/**
 * @swagger
 * /measurement:
 *   post:
 *     summary: Cria uma nova medição, pode ser recebida tanto um array de medições quanto apenas uma (como um objeto)
 *     tags: [Measurement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               equipmentId:
 *                 type: string
 *                 description: ID do equipamento
 *                 example: "123456"
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora da medição
 *                 example: "2024-09-27T15:30:00Z"
 *               value:
 *                 type: number
 *                 description: Valor da medição
 *                 example: 23.5
 *     responses:
 *       201:
 *         description: Medição criada com sucesso
 *       400:
 *         description: Dados inválidos no corpo da requisição
 */
measurementRouter.post(
  '/',
  bodyValiteMiddleware(CreateMeasurementDto),
  MeasurementController.create
);

/**
 * @swagger
 * /measurement/extractor/:
 *   post:
 *     summary: Faz o upload de um arquivo CSV e insere medições
 *     tags: [Measurement]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo CSV com medições
 *     responses:
 *       201:
 *         description: Medições inseridas com sucesso
 *       400:
 *         description: Arquivo inválido ou erro ao processar o CSV
 */
measurementRouter.post('/extractor/', MeasurementController.extractCsv);

/**
 * @swagger
 * /measurement:
 *   get:
 *     summary: Retorna medições dentro de um intervalo de tempo
 *     tags: [Measurement]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Número máximo de medições a serem retornadas
 *           default: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Página dos resultados
 *           default: 1
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *           description: Data de início para filtrar as medições
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *           description: Data final para filtrar as medições
 *     responses:
 *       200:
 *         description: Lista de medições
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   equipmentId:
 *                     type: string
 *                     description: ID do equipamento
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: Data e hora da medição
 *                   value:
 *                     type: number
 *                     description: Valor da medição
 *       400:
 *         description: Erro ao filtrar os resultados
 */
measurementRouter.get('/', MeasurementController.findMany);
