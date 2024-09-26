//4) Manipulação de Dados com Query Params
const express = require('express');
const app = express();

// Lista de produtos (exemplo)
const produtos = [
    { id: 1, nome: 'Camiseta', categoria: 'Roupas', preco: 49.90 },
    { id: 2, nome: 'Tênis', categoria: 'Calçados', preco: 199.90 },
    { id: 3, nome: 'Relógio', categoria: 'Acessórios', preco: 150.00 },
    { id: 4, nome: 'Boné', categoria: 'Roupas', preco: 29.90 },
];

// Rota que manipula query params para filtrar produtos
app.get('/produtos', (req, res) => {
    // Pega os query params da requisição
    const { categoria, precoMax } = req.query;

    // Filtra a lista de produtos
    let produtosFiltrados = produtos;

    // Se o parâmetro 'categoria' for fornecido, filtra por categoria
    if (categoria) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.categoria.toLowerCase() === categoria.toLowerCase());
    }

    // Se o parâmetro 'precoMax' for fornecido, filtra por preço máximo
    if (precoMax) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.preco <= parseFloat(precoMax));
    }

    // Formata a saída como texto com quebras de linha para cada produto
    const produtosFormatados = produtosFiltrados
    .map(produto => `ID: ${produto.id}, Nome: ${produto.nome}, Categoria: ${produto.categoria}, Preço: R$ ${produto.preco}`)
    .join('\n'); // Adiciona uma nova linha entre cada produto
    
    // Envia a resposta como texto formatado com <pre> para preservar a formatação no navegador
    res.send(`<pre>${produtosFormatados}</pre>`);
});

// Configurar o servidor para rodar na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


//======================================================

//http://localhost:3000/produtos 'Pesquiso todos os produtos'
//http://localhost:3000/produtos?categoria=Roupas 'Pesquiso somente roupas'
//http://localhost:3000/produtos?precoMax=200 'Pesuiso produtos com preço maximo ate 200'
//http://localhost:3000/produtos?categoria=Roupas&precoMax=50

//======================================================