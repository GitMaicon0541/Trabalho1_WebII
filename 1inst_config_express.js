// 1) Instalação e Configuração do Express.js
const express = require('express');
const app = express();

// Definir rota GET para "/"
app.get('/', (req, res) => {
    res.send('Seja Bem-vindo ao meu servidor Express!!!');
});

// Configurar o servidor para rodar na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//Comando 
//sudo node app.js

//======================================================
//======================================================



