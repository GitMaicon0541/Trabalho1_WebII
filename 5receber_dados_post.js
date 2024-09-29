//5) Receber Dados com POST

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); // Middleware para interpretar JSON

// Carregar produtos do arquivo JSON
let produtos = [];

// Função para carregar produtos do arquivo JSON
const carregarProdutos = () => {
    try {
        const data = fs.readFileSync('produtos.json', 'utf-8');
        produtos = JSON.parse(data);
    } catch (err) {
        console.log('Arquivo produtos.json não encontrado, iniciando com lista vazia.');
        produtos = [];
    }
};

// Função para salvar produtos no arquivo JSON
const salvarProdutos = () => {
    fs.writeFileSync('produtos.json', JSON.stringify(produtos, null, 2), 'utf-8');
};

// Chama a função para carregar os produtos no início
carregarProdutos();

// Rota GET para listar os produtos
app.get('/produtos', (req, res) => {

    res.send('==========================================================');
    res.json(produtos);
    res.send('==========================================================');
});

// Rota POST para adicionar um novo produto
app.post('/produtos', (req, res) => {
    const novoProduto = req.body;

    // Gera um ID único para o novo produto
    const novoId = produtos.length + 1;
    novoProduto.id = novoId;

    // Adiciona o novo produto à lista
    produtos.push(novoProduto);

    // Salva a lista atualizada de produtos no arquivo
    salvarProdutos();

    // Retorna o novo produto adicionado
    res.status(201).json(novoProduto);
});

// Configurar o servidor para rodar na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//======================================================

//sudo node 5receber_dados_post.js 
/*sudo curl -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d '{"nome": "Mochila", "categoria": "Acessórios", "preco": 89.90}'
{"nome":"Mochila","categoria":"Acessórios","preco":89.9,"id":5}*/
/*sudo curl -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d '{"nome": "Vestido Longo", "categoria": "Roupa", "preco": 75.55}'
{"nome":"Mochila","categoria":"Acessórios","preco":89.9,"id":6}*/

//======================================================