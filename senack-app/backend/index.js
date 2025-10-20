// backend/index.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let scores = [
    { name: 'Sena', score: 50 },
    { name: 'K1ng', score: 10 },
    { name: 'Ponto', score: 25 }
];

function quickSort(arr, key) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];
    for (const element of arr) {
        if (element[key] > pivot[key]) {
            left.push(element);
        } else if (element[key] < pivot[key]) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }
    return [...quickSort(left, key), ...equal, ...quickSort(right, key)];
}

app.get('/ranking', (req, res) => {
    console.log('GET /ranking - Solicitado ranking...');
    const sortedScores = quickSort([...scores], 'score');
    res.json(sortedScores.slice(0, 10));
});

app.post('/scores', (req, res) => {
    const { name, score } = req.body;
    if (!name || typeof score !== 'number') {
        return res.status(400).json({ message: 'Dados inválidos. Nome e score são obrigatórios.' });
    }
    const newScore = { name, score };
    scores.push(newScore);
    console.log('POST /scores - Novo score adicionado:', newScore);
    res.status(201).json({ message: 'Score adicionado com sucesso!' });
});

// --- NOVA ROTA ADICIONADA AQUI ---
// Rota DELETE /ranking
// Responsável por limpar (resetar) o array de scores.
app.delete('/ranking', (req, res) => {
    scores = []; // Esvazia o array de scores
    console.log('DELETE /ranking - Ranking foi resetado.');
    res.status(200).json({ message: 'Ranking resetado com sucesso!' });
});
// --- FIM DA NOVA ROTA ---

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});