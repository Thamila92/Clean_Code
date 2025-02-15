import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { createCard, getCards, updateCardAnswer,getQuizzCards } from '../services/ficheService.js';

export const CardHandler = (app) => {
    const swaggerDocument = YAML.load(new URL('../Swagger.yml', import.meta.url));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get('/cards', (req, res) => {
        res.status(200).json(getCards());
    });

    app.post('/cards', (req, res) => {
        const { question, answer } = req.body;
        const card = createCard(question, answer);
        res.status(201).json({ message: 'Card created', card });
    });

    app.patch('/cards/:cardId/answer', (req, res) => {
        try {
            const { cardId } = req.params;
            const { isValid } = req.body;
            updateCardAnswer(cardId, isValid);

            res.status(204).send();
        } catch (err) {
            res.status(404).send('Card not found');
            throw err;
        }
    });

    app.get('/cards/quizz', (req, res) => {
        try {
            const { date } = req.query;
            const cardsForQuizz = getQuizzCards(date);
            res.status(200).json(cardsForQuizz);
        } catch (err) {
            res.status(500).send('Error processing quizz cards');
            console.error(err);
        }
    });
};
