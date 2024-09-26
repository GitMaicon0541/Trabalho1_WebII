//2) Rotas Dinâmicas
const express = require('express');
const app = express();

// Rota dinâmica que captura o nome do usuário
app.get('/saudacao/:maicon', (req, res) => {
    const nomeUsuario = req.params.nome; // Captura o parâmetro 'nome' da URL
    res.send(`Olá, ${nomeUsuario}! Seja bem-vindo ao nosso servidor!`);
});

// Configurar o servidor para rodar na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//======================================================
//Comando 
//sudo node app.js
//http://localhost:3000/saudacao/maicon
//======================================================