const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const ficheService = require('./ficheService');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

const swaggerDocument = YAML.load('./Swagger.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/cards', (req, res) => {
    res.status(200).json(ficheService.getFiches());
});

app.post('/cards', (req, res) => {
    const { question, answer } = req.body;
    const card = ficheService.createFiche(question, answer);
    res.status(201).json({ message: 'Card created', card });
});

app.patch('/cards/:cardId/answer', (req, res) => {
    const { cardId } = req.params;
    const { isValid } = req.body;
    const success = ficheService.updateFicheAnswer(cardId, isValid);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send('Card not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger API documentation available at http://localhost:${PORT}/api-docs`);
});
