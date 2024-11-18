// Carrega configurações do arquivo .env
const dotenv = require('dotenv').config();
const connection = require('../config/db'); // Conexão com o banco de dados

// Função para armazenar uma nova tarefa no banco de dados
async function storeTask(request, response) {
    const { title, userId } = request.body; // Desestrutura o título e o ID do usuário do corpo da requisição
    const params = [title, userId]; // Parâmetros para a consulta SQL

    // Query SQL para inserir uma nova tarefa na tabela 'forum'
    const query = "INSERT INTO forum(title, id_user) VALUES(?, ?)";

    // Executa a consulta de inserção
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Erro ao inserir tarefa:", err); // Log de erro
            return response.status(500).json({
                success: false,
                message: "Erro interno ao inserir a tarefa.",
                sql: err
            });
        }

        // Obtém o ID da nova tarefa inserida
        const newTaskId = results.insertId;
        response.status(201).json({
            success: true,
            message: "Tarefa criada com sucesso!",
            data: { id: newTaskId, title }
        });
    });
}

// Função para atualizar uma tarefa existente no banco de dados
async function updateTask(request, response) {
    const { id } = request.params; // ID da tarefa a ser atualizada
    const { title } = request.body; // Novo título da tarefa

    console.log(`ID recebido: ${id}, Novo Título: ${title}`); // Log para depuração

    // Query SQL para atualizar o título da tarefa na tabela 'forum'
    const query = "UPDATE forum SET title = ? WHERE id = ?";

    // Executa a consulta de atualização
    connection.query(query, [title, id], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar tarefa:", err); // Log de erro
            return response.status(500).json({
                success: false,
                message: "Erro interno ao atualizar a tarefa.",
                sql: err
            });
        }

        // Verifica se a atualização foi bem-sucedida
        if (results && results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Tarefa atualizada com sucesso!"
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Tarefa não encontrada ou não atualizada.",
                data: { id }
            });
        }
    });
}

// Função para deletar uma tarefa existente no banco de dados
async function deleteTask(request, response) {
    const { id } = request.params; // ID da tarefa a ser deletada

    // Query SQL para deletar a tarefa na tabela 'forum'
    const query = "DELETE FROM forum WHERE id = ?";

    // Executa a consulta de exclusão
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Erro ao excluir tarefa:", err); // Log de erro
            return response.status(500).json({
                success: false,
                message: "Erro interno ao excluir a tarefa.",
                sql: err
            });
        }

        // Verifica se a exclusão foi bem-sucedida
        if (results && results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Tarefa deletada com sucesso!"
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Tarefa não encontrada ou não deletada.",
                data: { id }
            });
        }
    });
}

// Função para obter todas as tarefas no banco de dados
async function getTask(request, response) {
    // Query SQL para buscar todas as tarefas na tabela 'forum'
    const query = "SELECT * FROM forum";

    // Executa a consulta de seleção
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar tarefas:", err); // Log de erro
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar as tarefas.",
                sql: err
            });
        }

        response.status(200).json({
            success: true,
            data: results // Retorna as tarefas encontradas
        });
    });
}

// Função para obter as tarefas de um usuário específico
async function getTaskById(request, response) {
    const { userId } = request.params; // ID do usuário cujas tarefas serão buscadas

    // Query SQL para buscar tarefas de um usuário específico na tabela 'forum'
    const query = "SELECT * FROM forum WHERE id_user = ?";

    // Executa a consulta de seleção
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Erro ao buscar tarefas do usuário:", err); // Log de erro
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar as tarefas do usuário.",
                sql: err
            });
        }

        response.status(200).json({
            success: true,
            data: results // Retorna as tarefas do usuário encontradas
        });
    });
}

// Exporta as funções para serem usadas nas rotas
module.exports = {
    storeTask,
    updateTask,
    deleteTask,
    getTask,
    getTaskById
};
