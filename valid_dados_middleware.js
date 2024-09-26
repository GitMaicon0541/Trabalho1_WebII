//6) Validação de Dados com Middleware

const express = require('express');
const valid_dados_middleware = express();

// Middleware para interpretar JSON no corpo da requisição
valid_dados_middleware.use(express.json());

// Lista de usuários
let usuarios = [
    { id: 1, nome: 'João', email: 'joao@example.com', senha: '123456' },
    { id: 2, nome: 'Maria', email: 'maria@example.com', senha: 'abcdef' },
];

// Rota GET para listar os usuários com quebras de linha
valid_dados_middleware.get('/usuarios', (req, res) => {
    const usuariosFormatados = usuarios
        .map(usuario => `ID: ${usuario.id}\nNome: ${usuario.nome}\nEmail: ${usuario.email}\nSenha: ${usuario.senha}`)
        .join('\n\n'); // Quebra de linha entre os usuários

    res.send(`<pre>${usuariosFormatados}</pre>`); // Retorna o texto formatado
});

// Rota POST para adicionar um novo usuário
valid_dados_middleware.post('/usuarios', (req, res) => {
    const novoUsuario = req.body; // Recebe o novo usuário do corpo da requisição

    // Verifica se o corpo contém os dados necessários
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        return res.status(400).send('Todos os campos são obrigatórios: nome, email e senha.');
    }

    // Adiciona um ID único ao novo usuário
    const novoId = usuarios.length + 1;
    novoUsuario.id = novoId;

    // Adiciona o novo usuário à lista
    usuarios.push(novoUsuario);

    // Retorna o novo usuário adicionado na resposta
    res.status(201).json(novoUsuario);
});

// Configurar o servidor para rodar na porta 3000
const PORT = 3000;
valid_dados_middleware.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//======================================================

//node valid_dados_middleware.js
//curl -X POST http://localhost:3000/usuarios -H "Content-Type: application/json" -d '{"nome": "Carlos", "email": "carlos@example.com", "senha": "123456"}'
//http://localhost:3000/usuarios

//======================================================
