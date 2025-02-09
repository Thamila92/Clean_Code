const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const PORT = 8080;

 app.use(bodyParser.json());

 const swaggerDocument = YAML.load('./swagger-steup.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

 app.get('/cards', (req, res) => {
     res.status(200).json([
        { id: '1', question: 'What is Node.js?', answer: 'A JavaScript runtime environment.', category: 'First' }
    ]);
});

 app.post('/cards', (req, res) => {
     const newCard = { id: '2', ...req.body };
    console.log(newCard);   
    res.status(201).json({ message: 'Card created', card: newCard });
});

 app.patch('/cards/:cardId/answer', (req, res) => {
     console.log(req.params.cardId, req.body);
    res.status(204).send();  
});

app.get('/cards/quizz', (req, res) => {
    const { date } = req.query; 
    
    res.status(200).json([
        { id: '1', question: 'What is Express?', answer: 'A web framework for Node.js', category: 'First' }
    ]);
});
 app.get('/', (req, res) => {
    res.send('Hello World!');
});

 app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger API documentation available at http://localhost:${PORT}/api-docs`);
});
