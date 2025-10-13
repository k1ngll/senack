// Importa o framework Express
const express = require('express');

// Cria uma instância do Express
const app = express();

// Define a porta em que o servidor irá rodar
const PORT = 3000;

// Rota de teste para garantir que o servidor está no ar
app.get('/', (req, res) => {
  res.json({ message: 'Servidor do SENACK está funcionando!' });
});

// Inicia o servidor e o faz "escutar" por requisições na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});