const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(bodyParser.json());

const swaggerDocument = YAML.load('./Swagger.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

 function readData() {
    try {
        const jsonData = fs.readFileSync(dataFilePath);
        return JSON.parse(jsonData);
    } catch (err) {
        return { cards: [] };   
    }
}

 function saveData(data) {
    const dataString = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, dataString);
}

 app.get('/cards', (req, res) => {
    const data = readData();
    res.status(200).json(data.cards);
});

 app.post('/cards', (req, res) => {
    const newCard = { id: Date.now().toString(), ...req.body };
    const data = readData();
    data.cards.push(newCard);
    saveData(data);
    res.status(201).json({ message: 'Card created', card: newCard });
});

 app.patch('/cards/:cardId/answer', (req, res) => {
    const { cardId } = req.params;
    const { isValid } = req.body;
    const data = readData();
    const card = data.cards.find(card => card.id === cardId);
    if (card) {
        card.answeredCorrectly = isValid;
        saveData(data);
        res.status(204).send();
    } else {
        res.status(404).send('Card not found');
    }
});

 app.get('/cards/quizz', (req, res) => {
    const { date } = req.query;
    const data = readData();
    //logique pour filter les crtes  (ps encore faite )
     res.status(200).json(data.cards);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger API documentation available at http://localhost:${PORT}/api-docs`);
});
