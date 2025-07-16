const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurguer rodando em localhost:${PORT}`);
});

app.get('/sugestao', (req, res) => {
    const {nome, ingredientes} = req.query;

    if(!nome || ! ingredientes) {
        return res.send(`
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
                <h2>É necessário preencher todos os campos</h2>
            </main>
  
            <a id="link-pag-externa" href="/">Voltar para a página inicial</a>
            <footer>
                <p>&copy; 2025 DevBurguer. Todos os direitos reservados.</p>
            </footer>
        </body>
    </html>`);
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

            <a id="link-pag-externa" href="/">Voltar para a página inicial</a>
            <footer>
                <p>&copy; 2025 DevBurguer. Todos os direitos reservados.</p>
            </footer>
        </body>
    </html>`);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});

app.post('/contato', (req, res) => {
    const {nome, email, assunto, mensagem} = req.body;
    if(!nome || !email || !assunto || !mensagem) {
        return res.send(`
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
                <h2>É necessário preencher todos os campos</h2>
            </main>
            <a id="link-pag-externa" href="/">Voltar para a página inicial</a>
            <footer>
                <p>&copy; 2025 DevBurguer. Todos os direitos reservados.</p>
            </footer>
        </body>
    </html>`);
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
                <h2>Recebemos a sua mensagem! Agradecemos pelo contato</h2>
                <div class="message">
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Assunto:</strong> ${assunto}</p>
                    <p><strong>Mensagem:</strong> ${mensagem}</p>
                </div>
            </main>

            <a id="link-pag-externa" href="/">Voltar para a página inicial</a>
            <footer>
                <p>&copy; 2025 DevBurguer. Todos os direitos reservados.</p>
            </footer>
        </body>
    </html>`);
});

app.get('/api/lanches', (req, res) => {
    const lanches = [
        {
            "id": 1,
            "nome": "DevBurger Clássico",
            "ingredientes": "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
        },
        {
            "id": 2,
            "nome": "Burger de Bacon",
            "ingredientes": "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
        },
        {
            "id": 3,
            "nome": "Commit Veggie",
            "ingredientes": "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
        },
    ];
    res.json(lanches);
});

app.use((req, res) => {
    res.status(404).send(`
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
                <h2>Erro 404! Página não encontrada</h2>
                <p>Desculpe, a página que você está procurando não existe.</p>
                <p>Por favor, verifique o endereço ou volte para a página inicial.</p>
            </main>

            <a id="link-pag-externa" href="/">Voltar para a página inicial</a>
            <footer>
                <p>&copy; 2025 DevBurguer. Todos os direitos reservados.</p>
            </footer>
        </body>
    </html>`);
})