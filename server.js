const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurguer rodando em localhost:${PORT}`);
});

app.get('/sugestao', (req, res) => {
    const {nome, ingredientes} = req.query;

    if(!nome || ! ingredientes) {
        return res.send('<p>É necessário preencher todos os campos!</p>');
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>DevBurguer</title>
                <link rel="stylesheet" href="/css/style.css">
                <link rel="icon" href="/images/devburger-icon.ico" type="image/x-icon">
            </head>
            <body>
                <header>
                    <img src="/images/logo.png" alt="DevBurguer Logo" class="logo">
                </header>
            <main>
                <h2>Obrigado por contribuir com a DevBurguer!</h2>
                <div class="message">
                    <p>${nome} sua sugestão foi recebida com sucesso! DevBurger agradece :)</p> 
                    <p>--- Resumo da sugestão ---</p> 
                    <p>Nome: ${nome}<br>Ingredientes: ${ingredientes}</p>
                </div>
            </main>
            <p>Voltar para a página inicial</p>
            <a href="/">Início</a>
            <footer>
                <p>&copy; 2025 DevBurguer. Todos os direitos reservados.</p>
            </footer>
        </body>
    </html>`);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});
