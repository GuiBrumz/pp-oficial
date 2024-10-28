const { Router } = require('express');
const router = Router();

const { storeTask, updateTask, deleteTask, getTask } = require('../controller/taskController');

router.post('/store/task', storeTask);
/**
 * @swagger
 * /tasks/register:
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
 
router.put('/update/task/:id', updateTask);

/**
 * @swagger
 * /tasks/put:
 *  put:
 *    summary: Atualiza uma tarefa pelo ID
 *    responses:
 *      200:
 *        description: Uma lista de tarefas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
 router.delete('/delete/task/:id', deleteTask);
 
// Rota para atualizar uma tarefa existente (PUT).
/**
 * @swagger
 * /tasks/delete:
 *  delete:
 *    summary: Remove uma tarefa pelo ID
 *    responses:
 *      200:
 *        description: Uma lista de tarefas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
 
router.get('/task', getTask);
/**
 * @swagger
 * /tasks/list:
 *  get:
 *    summary: Retorna todas as tarefas
 *    responses:
 *      200:
 *        description: Uma lista de tarefas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
 
// Exportar a instância do 'router' para que ela possa ser usada em outros módulos da aplicação.

module.exports = router;