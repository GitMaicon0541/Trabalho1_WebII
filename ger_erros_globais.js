//7) Gerenciamento de Erros Globais

const express = require('express');
const app = express();

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

// Lista de usuários (exemplo inicial)
res.send('==========================================================');
let usuarios = [
    
    { id: 1, nome: 'João Luiz', email: 'joaol@gmail.com', senha: 'jl0505' },
    { id: 2, nome: 'Rita de Cassia', email: 'rc@hotmail.com.com', senha: 'rc1298' },
    { id: 3, nome: 'Max', email: 'max@gmail.com', senha: '1010101' },
];
res.send('==========================================================');
// Rota GET para listar os usuários com quebras de linha
app.get('/usuarios', (req, res, next) => {
    try {
        // Formatar os usuários com quebras de linha entre os campos
        const usuariosFormatados = usuarios
            .map(usuario => `ID: ${usuario.id}\nNome: ${usuario.nome}\nEmail: ${usuario.email}\nSenha: ${usuario.senha}`)
            .join('\n\n'); // Adiciona uma linha em branco entre os usuários

        // Enviar a resposta como texto formatado
        res.send(`<pre>${usuariosFormatados}</pre>`);
    } catch (error) {
        next(error); // Passa o erro para o middleware de erro
    }
});

// Rota POST para adicionar um novo usuário
app.post('/usuarios', (req, res, next) => {
    try {
        const novoUsuario = req.body;

        if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
            throw new Error('nome, email e senha : São obrigatórios: '); // Erro customizado
        }

        const novoId = usuarios.length + 1;
        novoUsuario.id = novoId;
        usuarios.push(novoUsuario);

        res.status(201).json(novoUsuario);
    } catch (error) {
        next(error); // Passa o erro para o middleware de erro
    }
});

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro no servidor

    // Enviar resposta JSON com código de erro e mensagem
    res.status(500).json({
        status: 'error',
        message: err.message || 'Erro interno do servidor',
    });
});

// Configura o servidor para rodar na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//======================================================

//node ger_erros_globais.js
//http://localhost:3000/usuarios
//curl -X POST http://localhost:3000/usuarios -H "Content-Type: application/json" -d '{"nome": "Carlos"}'

//Resposta
//{
//    "status": "error",
//    "message": "Todos os campos são obrigatórios: nome, email e senha."
//}


//======================================================
