const { v4: uuidv4 } = require('uuid');

class Card {
    constructor(question, answer, category = 'FIRST') {
        this.id = uuidv4();
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.date = new Date().toISOString();
        this.answeredCorrectly = null; 
    }
}

module.exports = Card;
