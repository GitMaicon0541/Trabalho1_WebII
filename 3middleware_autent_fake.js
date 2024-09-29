//3) Middleware de Autenticação Fake
const express = require('express');
const app = express();

// Middleware de autenticação fake
const autenticar = (req, res, next) => {
    const token = req.headers['authorization']; // Verifica o cabeçalho 'Authorization'
    
    if (token) {
          console.log(`Token fornecido: ${token}`);
        next(); // Se o token estiver presente, continue
    } else {
        // Modificação: permite acesso para testar no navegador
        console.log('Maicon_0541');
        res.send('==========================================================');
        res.send('Acesso permitido com token = Maicon_0541, sem erro 401 !!!');
        res.send('==========================================================');
        // Para manter o erro 401 no navegador, descomente a linha abaixo:
        // res.status(401).send('Erro 401: Não autorizado. Token não fornecido.');
    }
};

// Rota protegida pelo middleware de autenticação
app.get('/protegida', autenticar, (req, res) => {
    res.send('Bem-vindo à rota protegida!');
});

// Configurar o servidor para rodar na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//======================================================
//Comandos
//1 - Sem enviar authorization
//http://localhost:3000/protegida

//2 - enviando authorization com token
//curl -H "Authorization: MeuToken123" http://localhost:3000/protegida
//======================================================