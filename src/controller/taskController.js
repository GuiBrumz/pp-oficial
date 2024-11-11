const connection = require('../config/db');
const dotenv = require('dotenv').config();
const path = require('path');
 
async function storeTask(request, response){
    // Verifica se um arquivo foi enviado
    if (!request.files) {
        return response.status(400).json({
         success: false,
         message: "Você não enviou o arquivo de foto."
        });
    }

    // Recupera o arquivo de imagem enviado
    const imagem = request.files.imagem;
    // Gera um nome único para a imagem com base no timestamp atual e na extensão do arquivo
    const imagemNome = Date.now() + path.extname(imagem.name);

    // Move a imagem para a pasta de uploads
    imagem.mv(path.join(uploadPath, imagemNome)), (erro) => {
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }

    const params = Array(
        request.body.title,
        request.body.description,
        imagemNome
    );
 
    const query = "INSERT INTO tasks(title, description, imagem) VALUES(?,?,?)";
 
    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso!",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Ops, deu problema!",
                sql: err
            })
        }
    })
}}


module.exports = {
    storeTask
}