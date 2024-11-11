const { Router } = require('express');
const router = Router();
const { storeUser } = require('../controller/usersController');
 
/**
 * @swagger
 * /user/create:
 *  post:
 *    summary: Cadastra o usúario.
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
router.post('/user/create', storeUser);    
 
module.exports = router;