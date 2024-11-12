const { Router } = require('express');
const router = Router();

const { storeTask } = require('../controller/taskController');

/**
 * @swagger
 * /store/task:
 *  post:
 *    summary: Cadastra uma nova tarefa
 *    responses:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
 router.post('/store/task', storeTask);


module.exports = router;